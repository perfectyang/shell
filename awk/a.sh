#!/bin/bash

line=9
num=2
paypal='paypal'
sed -i "" "/$num/i \
if (data.event_status === 1) {\
  newHdReportData({\
    addtocartType: 'paypal',\
    price: data.price,\
  });\
}
" a.txt
