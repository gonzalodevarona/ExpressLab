FROM node:16-alpine 
WORKDIR /taller-jwt
COPY . .
#npm ci makes sure the exact versions in the lockfile gets installed
RUN npm ci 
RUN npm run tsc
EXPOSE 3000
CMD [ "npm", "run", "start" ]
