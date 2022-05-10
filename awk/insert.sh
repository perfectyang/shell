#!/bin/bash

#buyNowHdReport
#paypalHdReport
#addToCartHdReport

#addToCartHdReport modalType, variant, collectionId, collectionName, position
#buyNowHdReport modalType, variant, collectionId, collectionName, isMorePay, position

#line=`awk '/addToCartHdReport/{print NR}' product-button-report.js`
line=`awk '/buyNowHdReport/{print NR}' product-button-report.js`
echo $line
#gsed -i "${line}s/event_status /event_status, modalType, variant, collectionId, collectionName, position/" product-button-report.js
gsed -i "${line}s/event_status /event_status, modalType, variant, collectionId, collectionName, position, isMorePay/" product-button-report.js


#line=`awk '/addToCartHdReport/{print NR}' product-button-report.js`
#line=$((line+11))
##gsed -i  "${line}a \ \n" product-button-report.js
##echo $line
#gsed -i "${line}r buyNowHdReport.txt" product-button-report.js

