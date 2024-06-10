FROM node:lts AS development

COPY ./husky_sheets/package*.json ./

RUN npm install --force

COPY ./husky_sheets .

EXPOSE 3000

CMD [ "npm", "start" ]