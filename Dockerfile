FROM node:19.4.0

EXPOSE 8000

WORKDIR /prj

COPY ./src /prj

RUN npm install

CMD ["node", "main.js"]