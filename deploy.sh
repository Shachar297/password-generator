export build=$((build+1))
echo $build
git comadd -f

sleep 10

# tee | ./logs.sh $build > log.txt
