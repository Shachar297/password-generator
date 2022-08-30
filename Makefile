build_node:
	docker build . -t generator
	docker run -d --name generator -p 8755:8755 generator
	docker ps | grep generator
	open -a "Google Chrome" public/index.html 

push_node:
	cd docker
	
	chmod +x docker/dockerLogin.sh
	chmod +x docker/dockerCreds.sh
	./docker/dockerLogin.sh
	docker tag generator shacharovadia/generator
	docker push shacharovadia/generator

deploy_node:
	./docker/dockerLogin.sh	
	echo "PORT=8755" > K8S/.env
	kubectl kustomize K8s | kubectl apply -f -
	chmod +x while.sh
	./while.sh

start_cluster:
	minikube start

delete_node_cluster:
	kubectl kustomize K8S | kubectl delete -f -