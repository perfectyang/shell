#!/bin/bash

#修改原文件输入, 第一行后面一行，加内容
sed -i '1a 添加的内容' file.txt

#修改原文件输入, 第一行前面一行，加内容
sed -i '1i 添加的内容' file.txt


#修改原文件输入, 修改当前含有content内容的行
sed -i '/content/c' file.txt

#修改原文件输入, 删除当前含有content内容的行
sed -i '/content/d' file.txt
sed -i '10,11d' file.txt
sed -n '11p' file.txt

#修改原文件输入, 将有content内容替换成newContent,  gI 全局不区分大小写
sed -i 's/content/newContent/g' file.txt


#修改原文件输入, 捕获组,  gI 全局不区分大小写 -r 扩展正则
sed -i -r 's/([^:]+)(:.*:)([^:]+$)/[\3]--[\2]---[\1]/' passwd


#修改原文件输入, 将有content内容替换成newContent,  gI 全局不区分大小写
sed -i 's/content/newContent/g' file.txt

