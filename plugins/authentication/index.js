'use strict';

const fplugin = require('fastify-plugin');
const secretWord = 'supersecret';

async function authentication(fastify, options) {
  fastify
    .register(require('fastify-jwt'), {
      secret: secretWord,
    })
    .decorate('validateJWT', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    })
    .register(require('fastify-auth'))
    .decorate('validateUserPassword', async (request, replay) => {
      const { username, password } = request.body;
      if (username === 'jesus' && password === '123') {
        request.user = username;
        return;
      } else {
        replay.code(401).send('Invalid Credentials');
      }
    })
    .after(() => {
      fastify.post(
        '/auth',
        { preValidation: fastify.auth([fastify.validateUserPassword]) },
        async (request, reply) => {
          const user = request.user;
          const token = fastify.jwt.sign({ user });
          return token;
        }
      );
    });
}

module.exports = fplugin(authentication);
