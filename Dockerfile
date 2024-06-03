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

RUN ls -la /app/server/dist
RUN ls -la /app/shared/dist
RUN ls -la /app/client/dist

FROM node:21-alpine AS production
ENV NODE_ENV production

WORKDIR /app

COPY ./shared/package*.json ./shared/
COPY ./server/package*.json ./server/
COPY ./server/.env* ./server/
COPY ./client/package*.json ./client/
COPY ./client/.env* ./client/

RUN npm ci --prefix shared --only=production && \
    npm ci --prefix server --only=production && \
    npm ci --prefix client --only=production

COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist

RUN ls -la /app/server/dist
RUN ls -la /app/shared/dist
RUN ls -la /app/client/dist

EXPOSE 3213

CMD ["npm", "--prefix", "server", "start"]