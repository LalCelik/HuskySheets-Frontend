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

## Other
- You can run this python script to open a sheet as well (when the frontend and backend servers are running):
  - `python3 openSheet.py --url="http://localhost:3000" --name="user1" --password="user1" --publisher="user3" --sheet="Example Sheet"`
  - Might have to install selenium: `pip install selenium`