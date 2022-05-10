import { getEventID } from '@yy/sl-theme-shared/utils/report/tool';
import currency from '@yy/sl-theme-shared/utils/currency';
import dataReportAddToCart from '@yy/sl-theme-shared/events/data-report/add-to-cart';
import '@yy/sl-theme-shared/report/customArgs';

const { formatCurrency } = currency;

export function reportAddToCartEvent(data) {
  try {
    dataReportAddToCart(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
// addtocart第三方埋点
export function addToCartThirdReport({ spuId, name, itemNo, price, skuId, num, eventID = getEventID(), variant }) {
  window.SL_EventBus.emit('global:thirdPartReport', {
    GA: [
      [
        'event',
        'add_to_cart',
        {
          items: [
            {
              id: itemNo || skuId,
              name,
              price: formatCurrency(price),
              quantity: num,
              variant,
            },
          ],
        },
      ],
    ],
    GAAds: [
      [
        'event',
        'conversion',
        {
          value: formatCurrency(price * (num || 1)),
          currency: window.SL_State.get('storeInfo.currency'),
        },
        'ADD-TO-CART', // 如果是添加到购物车，需要传scope
      ],
    ],
    FBPixel: [
      [
        'track',
        'AddToCart',
        {
          content_ids: spuId,
          content_name: name || '',
          content_category: '',
          content_type: 'product_group',
          currency: window.SL_State.get('storeInfo.currency'),
          value: formatCurrency(price),
        },
        {
          eventID: `addToCart${eventID}`,
        },
      ],
    ],
    GAR: [
      [
        'event',
        'add_to_cart',
        {
          value: formatCurrency(price * (num || 1)),
          items: [{ id: window.SL_GetReportArg('GAR', 'sku_id', skuId), google_business_vertical: 'retail' }],
        },
      ],
    ],
    GARemarketing: [
      [
        'event',
        'add_to_cart',
        {
          ecomm_prodid: window.SL_GetReportArg('GAR', 'sku_id', skuId),
          ecomm_pagetype: 'cart',
          ecomm_totalvalue: formatCurrency(price * (num || 1)),
        },
      ],
    ],
  });
  reportAddToCartEvent({
    content_spu_id: spuId,
    content_sku_id: skuId,
    content_category: '',
    content_name: name,
    currency: window?.SL_State?.get('storeInfo.currency'),
    price: formatCurrency(price || 0),
    value: formatCurrency(price || 0),
    quantity: num,
  });

  return eventID;
}
// addtocart海度埋点
export function addToCartHdReport({ spuId, skuId, num, price, name, page, event_status, modalType, variant, collectionId, collectionName, position }) {
  console.log('modalType', modalType);
  window.HdSdk?.shopTracker.report('60006263', {
    page,
    event_name: 'additem',
    event_category: 'cart',
    product_type: 'product',
    product_id: spuId,
    variantion_id: skuId,
    quantity: num,
    price: formatCurrency(price),
    product_name: name,
    event_status,
  });

  // 海度新协议事件成功才上报
  if (event_status === 1) {
    newHdReportData({
      addtocartType: 'addtocart',
      price,
      page,
      skuId,
      spuId,
      num,
      modalType,
      variant,
      collectionId,
      collectionName,
      position,
    });
  }
}

// buynow海度埋点
export function buyNowHdReport({ spuId, skuId, num, price, name, page, event_status, modalType, variant, collectionId, collectionName, isMorePay, position }) {
  window.HdSdk?.shopTracker.report('60006263', {
    page,
    event_name: 'buy_now',
    product_id: spuId,
    variantion_id: skuId,
    quantity: num,
    price: formatCurrency(price),
    product_name: name,
    event_category: 'cart',
    event_status,
  });

  // 海度新协议事件成功才上报
  if (event_status === 1) {
    newHdReportData({
      addtocartType: isMorePay ? 'morePay' : 'buynow',
      price,
      page,
      skuId,
      spuId,
      num,
      modalType,
      variant,
      collectionId,
      collectionName,
      position,
    });
  }
}

// paypal海度埋点
export function paypalHdReport(data) {
  window.HdSdk?.shopTracker.report('60006263', data);
  // 海度新协议事件成功才上报
  if (data.event_status === 1) {
    newHdReportData({
      addtocartType: 'paypal',
      price: data.price,
      page: data.page,
      skuId: data.skuId,
      spuId: data.spuId,
      num: data.quantity,
      modalType: data.modalType,
      variant: data.variant,
      collectionId: data.collectionId,
      collectionName: data.collectionName,
      position: data.position,
    });
  }
}

const componentMap = {
  addtocart: 101,
  buynow: 102,
  paypal: 103,
  morePay: 104,
};

const pageMap = {
  Home: {
    page: 101,
    module: 101,
  },
  ProductsDetail: {
    page: 105,
    module: 102,
  },
  QuickView: {
    page: 107,
    module: 102,
  },
  QuickAdd: {
    page: 108,
    module: 102,
  },
  SingleQuickAdd: {
    // 无款式商品，点击快速加购按钮将会直接加入购物车，此时上报此事件
    page: 108,
    module: 109,
    component: 101,
  },
};
const pageId = {
  Home: 101,
  ProductsSearch: 102,
  Products: 103,
  ProductsDetail: 105,
  Activity: 115,
};

// 如何modalType无值，则用window.SL_State.get('templateAlias') 来区分是否是首页，还是详情页
// modalType: QuickAdd QuickView SingleQuickAdd 用来区分弹窗类型
// https://shopline.yuque.com/slpm/svh090/tk5zz9#r0Wd 参数文档
function newHdReportData({ addtocartType, price, skuId, spuId, num, modalType, variant, collectionId, collectionName, position }) {
  console.log('modalType', modalType);
  let config = {};
  if (modalType) {
    // 弹窗里面的加购事件
    config = pageMap[modalType];
    // 弹窗需要加page_id来区分
    config.page_id = pageId[window.SL_State?.get('templateAlias')];
  } else {
    // 页面的加购事件
    config = pageMap[window.SL_State?.get('templateAlias')] ?? {};
  }
  const index = (position ?? '') === '' ? '' : Number(position) + 1
  let data = {
    component: componentMap[addtocartType],
    ...config,
    event_name: 'AddToCart',
    addtocart_type: addtocartType === 'morePay' ? 'buynow' : addtocartType,
    action_type: -999, // 标准事件都是-999,产品定的
    event_id: `AddToCart${getEventID()}`,
    currency: window?.SL_State?.get('storeInfo.currency'),
    value: formatCurrency(price), // 价格
    items: [
      {
        sku_id: skuId,
        spu_id: spuId,
        index,
        collection_id: collectionId ?? '',
        collection_name: collectionName ?? '',
        variant: variant ?? '',
        price: formatCurrency(price),
        quantity: num,
      },
    ],
  };
  // 快速加购」按钮的主题样式，若该商品是无款式商品，在商品列表，点击快速加购按钮将会直接加入购
  if (modalType && modalType === 'SingleQuickAdd') {
    data = {
      ...config,
      spu_id: spuId,
      price: formatCurrency(price),
      position: index,
      status: 1
    }
  }
  console.log('新协议海度上报---测试看', data);
  window.HdSdk?.shopTracker.collect(data);
}
