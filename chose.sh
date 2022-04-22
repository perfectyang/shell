#!/bin/bash

#echo "name >>>>>>>>:"
#echo $*
#for key in $@
#do
#  echo "--->"$key
#done


#read -p "enter your content2:"
#echo $REPLY

function run () {
  echo "hello run"
}

read -p "输入执行函数名:" func
$func
#read -p "enter your name:" name
#echo $name
