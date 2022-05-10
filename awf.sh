#!/bin/bash

# '' 里面可以执行脚本 i是变量 NR:行号 NF:列号
#awk -v i=2 -F ":" '/^root/ {print $1,$2+i}' filename
awk  '/^root/ {print NR NF FILENAME}'


