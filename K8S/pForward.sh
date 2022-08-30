pods=$(kubectl get po -n generator)
pod=$(kubectl get po -n generator -o=json | jq '.items[0].metadata.name')

pod=${pod#?} # Remove quates from pod name comming from jq
pod=${pod%?} # Remove quates from pod name comming from jq


while true
do
    # Wait until pods in generator namespace will be running to port-forward.
    if [[ $(kubectl get po -n generator) == *"Running"* ]]; then
        # port-forward pods on a local machine, Use NodePort on remote machine (SAS)
        kubectl port-forward \
            $pod \
            -n generator \
            8755:8755
        break

    else

    echo "Waiting for pods to be created..."
    sleep 4

    fi
    
done