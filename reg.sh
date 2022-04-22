#!/bin/bash


#if [[ $1 =~ ^(release|hotfix)/*  ]]; then
#  echo "relse"
#fi

#([ -d ./df ]) && rm -rf ./df


for file in `ls ./`
do
  if [[ $file =~ file-[0-9] ]]; then
    rm -rf $file
    echo $file
  fi

done

