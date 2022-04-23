#!/bin/bash


for file in `ls *finish*.png`
do
  mv $file `echo ${file//finish/}`
done
