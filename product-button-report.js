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
    GA4: [
      [
        'event',
        'add_to_cart',
        {
          currency: window.SL_State.get('storeInfo.currency'),
          value: formatCurrency(price * (num || 1)),
          items: [
            {
              item_id: itemNo || skuId,
              item_name: name,
              price: formatCurrency(price),
              quantity: num,
              item_variant: variant,
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
export function addToCartHdReport({ spuId, skuId, num, price, name, page, event_status }) {
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
}

// buynow海度埋点
export function buyNowHdReport({ spuId, skuId, num, price, name, page, event_status }) {
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
}

// paypal海度埋点
export function paypalHdReport(data) {
  window.HdSdk?.shopTracker.report('60006263', data);
}
