# Authentication Fastify Plugin

## Pre-Reqs

I am assuming that you have the basic setup on your local machine such as **Node Package Manager**, `Docker` and do have a fair understanding of `Javascript`, NodeJS, `Fastify`, `REDIS`, and `Docker`.

## Let's Begin

I will begin with the construct to install `Redis` using `docker` and then move towards the usage in the local dev environment.

## Install Redis using Docker

To accomplish this step, fire up your **terminal** and execute the following command.

    docker run -d --name vinyl-redis-db -p 127.0.0.1:6379:6379 redis

1. **`run`** - Create and start the container
2. **`-d`** - Runs the container in the detached mode
3. **`--name`** - Assigns the name to the container
4. **`-p`** - Maps the port as well the `IP` to the local machine. This is the catch here to enable the services locally. If you create the image without the local mapping, then you will not be able to access this information. **6379** is the default port for `Redis`.
5. **`redis** - Name of the image to be downloaded.

### After that, You can...

You can see the list of all the containers that are associated with docker on your machine.

    docker ps -a

If you have provided the name to your container then use the name or utilize the ID associated with the container.

    docker exec -it vinyl-redis-db sh

To test your installation, proceed as follows and run some basic `Redis` commands.

```bash
# redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> set customer_name "John Doe"
OK
127.0.0.1:6379> get customer_name
"John Doe"
127.0.0.1:6379> del customer_name
(integer) 1
127.0.0.1:6379> exit
# exit
```

### Get Redis client from Fastify App

Example for get `Redis` client from everywhere in a `Fastify` application Server.

```javascript
const { redis } = fastify;

redis.get(userkey, (err, val) => {
  reply.send(err || val);
});
```
