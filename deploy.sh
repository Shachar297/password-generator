echo $build
build=$((build+1))
git comadd -f

sleep 10

tee | ./logs.sh $build > log.txt
