'use strict';

const fPlugin = require('fastify-plugin');

async function dbConnector(fastify, options) {
  fastify.register(require('fastify-mongodb'), {
    forceClose: true,
    url: 'mongodb://localhost:27017/mongo_db',
  });
}
// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fPlugin(dbConnector);
