FROM node:18
WORKDIR /app
COPY ../../frontend .
RUN npm install
RUN npm install vite --save-dev
RUN npm i -g serve
EXPOSE 5173
CMD [ "npm", "run", "dev", "--", "--host" ]
