#!/bin/bash

#function readfile ()
# {
# for file in `ls $1`
# do
## 判断是否是文件夹，如果是文件夹则删除文件夹中的 dev test release 分支
# if [ -d $1"/"$file ]
# then
#  cd ${file}
#  if [[ $file =~ ^[^d] ]]; then
#    pwd
#    git status
#  fi
#  #git init
#  #git add .; git commit -m "feat: ga4上报";git push;
#  #git checkout master;
#  #git checkout master; git pull; git checkout -b feature/yangguowei/GA4
#  cd ..
# fi
# done
#}
#readfile "./"
#
#echo '完美的运行！'

#$1~$9：函数的第一个到第9个的参数。
#$0：函数所在的脚本名。
#$#：函数的参数总数。
#$@：函数的全部参数，参数之间使用空格分隔。
#$*：函数的全部参数，参数之间使用变量$IFS值的第一个字符分隔，默认为空格，但是可以自定义。

#function Run () {
#  echo $1;echo $@;echo $0;echo $#; echo $*;
#}
#
#Run $1 $2 $3 $4
