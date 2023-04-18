# install an operating system and node.js
FROM node:alpine

WORKDIR /app

#add project files
ADD package.json package-lock.json ./

#run npm install
RUN npm install

ADD .eslintrc.cjs /app/.eslintrc.cjs
ADD .prettierrc.json /app/.prettierrc.json
ADD index.html /app/index.html
ADD vite.config.js /app/vite.config.js
ADD vitest.config.js /app/vitest.config.js

#run npm start
CMD [ "npm", "run", "dev" ]
