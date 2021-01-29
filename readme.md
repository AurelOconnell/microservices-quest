# Microservices

## Installation

```shell
cd client
npm i
cd ../wilder
npm i
cd ../skill
npm i
cd ../vote
npm i
cd ../query
npm i
```

## Run

- Run a nats streaming server container

```shell
docker run -p 4222:4222 -p 8222:8222 --name nats-streaming-server nats-streaming
```

- Run a mongo container

```shell
docker run -p 27017:27017 -d --name mongo mongo
```

- Run a redis container

```shell
docker run -p 6379:6379 -d --name redis redis
```

- Run a postgres container

```shell
docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

- run client

```shell
cd client
npm start
```

- run wilder service

open another terminal

```shell
cd wilder
npm start
```

- run skill service

open another terminal

```shell
cd skill
npm start
```

- run vote service

open another terminal

```shell
cd vote
npm start
```

- run query service

open another terminal

```shell
cd query
npm start
```