FROM node:lts-alpine

COPY package*.json ./

RUN npm ci --only=production

COPY ./ ./ 

RUN npx prisma migrate reset --force

EXPOSE 5000

CMD [ "npm", "start" ]