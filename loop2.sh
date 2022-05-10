#!/bin/env bash
function batchGit () {
  for file in `ls $1`
  do
    if [[ -d $file && $file =~ ^[^d] ]]; then
      cd ${file}
      pwd
      git checkout master; git checkout -b $2;
      cd ..
    fi
  done
}

function batchDelGit () {
  for file in `ls $1`
  do
    if [[ -d $file && $file =~ ^[^d] ]]; then
      cd ${file}
      pwd
      git checkout master; git branch -D $2;
      cd ..
    fi
  done
}
echo -n "输入一些文本 > "
read text p1 p2
echo "你的输入：$text $p1 $p2"
$text $p1 $p2
#batchDelGit $1 $2
