FROM node:20-alpine

WORKDIR /usr/app

RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
