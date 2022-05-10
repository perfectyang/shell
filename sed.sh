#!/bin/bash

line=`awk '/opacity/ {print NR}' product-tax.scss`
echo `gsed -e "${line}a\newLine:good" product-tax.scss`
echo "--------------"
echo `gsed -i "${line}i \  before:good \\n  before2: perfectyang" product-tax.scss`
echo "--------------"
echo `gsed -e '1,4d' product-tax.scss`
echo $line

