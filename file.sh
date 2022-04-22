#!/bin/env bash

#if [ -f $1 ]; then
#  echo "is File"
#  ls -l $1
#elif [ -d $1 ]; then
#  echo "is dir"
#  ls -ld $1
#else
#  echo "no exist"
#fi
#number=0
#while [ "$number" -lt 10 ]; do
#  mkdir "file-$number"; cd "file-$number"; touch index.js; cd ../;
#  number=$((number + 1))
#done

if [[ $1 =~ ^[^i] ]]; then
  pwd


