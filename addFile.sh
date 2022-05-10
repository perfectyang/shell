#!/usr/bin/env bash

# r:操作符 在第一行后面加入test.js文件的内容到a.sh文件里面去
sed -i '1r test.js' a.sh
