FROM node:lts AS development

COPY ./husky_sheets/ ./frontend
WORKDIR ./frontend

RUN npm install --force

EXPOSE 3000

CMD [ "npm", "start" ]