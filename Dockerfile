FROM node
WORKDIR /nodebackend
COPY . .
RUN npm install
CMD [ "node","server.js" ]