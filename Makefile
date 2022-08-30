build_node:
	docker build . -t generator
	docker run  --name generator -p 8755:8755
	docker ps
	open -a "Google Chrome" public/index.html 