FROM node:21-alpine AS build

WORKDIR /app

COPY ./shared/package*.json ./shared/
COPY ./server/package*.json ./server/
COPY ./client/package*.json ./client/

RUN npm install --prefix shared && \
    npm install --prefix server && \
    npm install --prefix client

COPY . .

RUN npm run build

FROM node:21-alpine AS production
ENV NODE_ENV production

WORKDIR /app

COPY ./shared/package*.json ./shared/

COPY ./server/package*.json ./server/
COPY ./server/.env*         ./server/

COPY ./client/package*.json ./client/
COPY ./client/.env*         ./client/

RUN npm ci --prefix shared --omit=dev && \
    npm ci --prefix server --omit=dev && \
    npm ci --prefix client --omit=dev

COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

EXPOSE 3213

CMD ["npm", "--prefix", "server", "start"]