FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://postgres:1337FIL@db:5432/mydatabase?schema=public"
ENV NODE_ENV=production

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

RUN npx prisma migrate deploy

CMD ["npm", "run", "start"]
