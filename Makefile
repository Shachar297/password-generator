build_node:
	docker build . -t generator
	docker run -d --name generator -p 8755:8755 generator
	docker ps | grep generator
	open -a "Google Chrome" public/index.html 