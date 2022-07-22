#!/usr/bin/env bash

list=(a b c d e f)

string="this,is,my,shell"

# echo ${#list[@]}
# echo ${list[@]}
# list[0]=good
# echo ${list[0]}
# echo ${list[3]}
# 从索引1开始，取3位数
# echo ${list[@]:1:3}
# 转换字符串有中间空格，就转成数组
# arr=(${string//,/ })
# arr=(`echo $string | tr ', ' ' '`)
# for name in ${arr[@]}
# do
#   echo $name
# done

# str=''
# for key in ${list[@]}
# do
#   str=$str$key
# done
# echo $str

# total=${#list[@]}
# echo $total


for ((i=0; i<10;i++))
do
  echo $i
done