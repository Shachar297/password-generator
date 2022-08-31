build_node:
	docker build server/ -t generator
	docker run -d --name generator -p 8755:8755 generator
	docker ps | grep generator
	open -a "Google Chrome" server/public/index.html 

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
	chmod +x K8S/pForward.sh
	./K8S/pForward.sh

start_cluster:
	minikube start

delete_node_cluster:
	kubectl kustomize K8S | kubectl delete -f -

init_vault:
	chmod +x Vault/init.sh
	./Vault/init.sh

	
	