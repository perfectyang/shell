#!/bin/bash

function batchGit ()
 {
 for file in `ls $1`
 do
# 判断是否是文件夹，如果是文件夹则删除文件夹中的 dev test release 分支
 if [ -d $1"/"$file ]
 then
  cd ${file}
  if [[ $file =~ ^[^d] ]]; then
    pwd
    git checkout master; git pull; git checkout -b $2
  fi
  cd ..
 fi
 done
 echo "批量创建分支成功 "$2
}

function batchDelGit () {
 for file in `ls $1`
 do
# 判断是否是文件夹，如果是文件夹则删除文件夹中的 dev test release 分支
 if [ -d $1"/"$file ]
 then
  cd ${file}
  if [[ $file =~ ^[^d] ]]; then
    pwd
    git checkout master; git pull; git branch -D $2
  fi
  #git init
  #git add .; git commit -m "feat: ga4上报";git push;
  #git checkout master;
  #git checkout master; git pull; git checkout -b feature/yangguowei/GA4
  cd ..
 fi
 done
 echo "批量删除分支成功 "$2
}


function batchCommit () {
 for file in `ls $1`
 do
# 判断是否是文件夹，如果是文件夹则删除文件夹中的 dev test release 分支
 if [ -d $1"/"$file ]
 then
  cd ${file}
  if [[ $file =~ ^[^d] ]]; then
    pwd
    #echo index.js >> "添加新内容"
    git add .; git commit -m $2
    #git push;
  fi
  cd ..
 fi
 done
 echo "批量提交信息成功 "$2
}

PS3="输入要执行操作: "
operateList=("批量生成分支" "批量提交commit" "批量删除分支" "退出")
select key in "${operateList[@]}"
do
  case $key in
    "批量生成分支")
        read -p "请输入批量创建分支名: " brName
        realName="feature/yangguowei/"$brName
        batchGit ./ $realName
        break
        ;;
    "批量删除分支")
        read -p "请输入批量删除分支名: " brName
        realName="feature/yangguowei/"$brName
        batchDelGit ./ $realName
        break
        ;;
    "批量提交commit")
        read -p "请输入提交信息: " info
        batchCommit ./ $info
        break
        ;;
    "退出")
        echo "正常退出"
        break
        ;;
     *)
       echo "nothing"
   esac
done
