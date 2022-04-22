#!/bin/bash


for file in `ls style`
do
  echo  ${file%.*}
  #echo  ${file#*.}
done
