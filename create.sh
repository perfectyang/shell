#!/bin/bash

mkdir batchCreate
cd batchCreate
for ((i=1; i<=4; i++))
do
  touch $i.sh
  echo '#!/bin/bash' > $i.sh
  chmod 764 $i.sh
  echo "success create!!!"
done
