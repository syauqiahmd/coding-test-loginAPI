FROM node:18.12

ENV PORT=4001

# WORKDIR 

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]