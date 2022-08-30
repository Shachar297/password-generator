pods=$(kubectl get po -n generator)
pod=$(kubectl get po -n generator -o=json | jq '.items[0].metadata.name')

pod=${pod#?} # Remove quates from pod name comming from jq
pod=${pod%?} # Remove quates from pod name comming from jq


while true
do

    if [[ $pods == *"Running"* ]]; then
        
        kubectl port-forward \
            $pod \
            -n generator \
            8755:8755
        break

    else

    echo "Waiting for pods to be created..."
    sleep 2

    fi
    
done