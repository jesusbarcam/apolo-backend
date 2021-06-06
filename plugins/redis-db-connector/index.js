'use strict';

const fPlugin = require('fastify-plugin');
const redis = require('redis');

async function dbConnector(fastify, options) {
  const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });

  redisClient.on('error', (err) => {
    console.log('Error attempt connect to Redis: ', err);
  });

  fastify.decorate('redis', redisClient);
} // dbConnector

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fPlugin(dbConnector);
