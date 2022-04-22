arr=(one two)
# 长度
echo ${#arr[@]}
for key in ${arr[@]}
do
  echo $key
done