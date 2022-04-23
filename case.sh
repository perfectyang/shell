#!/bin/bash

scriptPath=./testscript

[ ! -d "$scriptPath" ] && {
  mkdir $scriptPath -p
  echo "创建成功"
}


cat <<END
    1.[install lamp]
    2.[install lnmp]
    3.[exit]
END
read -p "please input the num your want:" num

expr $num + 1
[ $? -ne 0 ] && {
  echo "输入有误"
  exit 1
}

[[ ! "$num" =~ [1-3] ]] && {
  echo "Your input must be number"
  exit 1
}

[ "$num" -eq "1" ] && {
  echo "number 1"
}

[ "$num" -eq "2" ] && {
  echo "number 2"
}

[ "$num" -eq "3" ] && {
  echo "number 3"
}
