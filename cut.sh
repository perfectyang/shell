#!/bin/bash
# -d 指定切割符 -f 提取列号 6-: 从第6列开始到最后,    1,2,4:提取1,2,4列
#cat /etc/passwd | cut -d ":" -f 6-
cat /etc/passwd | cut -d ":" -f 1,2,6
