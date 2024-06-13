all: test docker

build-frontend:
	npm install --force --prefix ./husky_sheets
	npm start --prefix ./husky_sheets

build-backend:
	cd ./Server/husksheets/ && .\gradlew bootRun

docker:
	docker-compose up

test:
	cd ./husky_sheets/ && npm test -- --watchAll=false
	cd ./Server/husksheets/ && .\gradlew test