# CS4530-Code
## Makefile:
- `make`: runs test then docker
- `make test `: runs tests
- `make build-frontend`: builds and runs frontend
- `make build-backend`: builds and runs backend
- `make docker`: runs the project in docker and runs the tests

## Running frontend
- Navigate to /husky_sheets/
- Run `npm install --force` to install the dependencies
- Run `npm start` to start the frontend application

## Running backend
- Navigate to /Server/husksheets/
- Run `.\gradlew bootRun` to install and run the backend application

## Database
- User data stored locally in /Server/husksheets/src/main/java/com/valid/husksheets/db/system.json
- Sheet data stored locally in /Server/husksheets/src/main/resources/sheets.json