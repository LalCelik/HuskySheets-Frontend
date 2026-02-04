# HuskySheets Project
# A spreadsheet application with a React frontend and Java Spring Boot backend.
#
# Targets:
#   all             - Run tests and start docker (default)
#   build-frontend  - Install dependencies and start the React frontend
#   build-backend   - Start the Spring Boot backend server
#   docker          - Start all services using docker compose
#   test            - Run frontend and backend tests

all: test docker

build-frontend:
	npm install --force --prefix ./husky_sheets
	npm start --prefix ./husky_sheets

build-backend:
	cd ./Server/husksheets/ && ./gradlew bootRun

docker:
	docker compose up

test:
	cd ./husky_sheets/ && npm test -- --watchAll=false
	cd ./Server/husksheets/ && ./gradlew test