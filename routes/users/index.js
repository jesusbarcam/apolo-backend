'use strict';

//const { usersService } = require('usersService');
const {
  publicUser,
  publicUsers,
  usersResponseSchema,
  createUser,
  createUserResponseSchema,
} = require('./users.schema');

module.exports = async function (fastify, options) {
  const collection = fastify.mongo.db.collection('users');

  fastify.addSchema(publicUser);
  fastify.addSchema(publicUsers);
  fastify.addSchema(createUser);

  fastify.post(
    '/users',
    { preValidation: [fastify.validateJWT] },
    async (request, reply) => {
      const userToInsert = { ...request.body };
      fastify.log.info(
        `Intentando crear el usuario: ${userToInsert.toString()}`
      );
      reply.code(201);
      return await collection.insertOne(userToInsert);
    }
  );

  fastify.delete(
    '/users',
    { preValidation: [fastify.validateJWT] },
    async (request, reply) => {
      const usermail = request.body.usermail;
      fastify.log.info(`Intentando borrar el usuario con email: ${usermail}`);
      return await collection.deleteOne({
        email: usermail,
      });
    }
  );

  fastify.put(
    '/users',
    { preValidation: [fastify.validateJWT] },
    async (request, reply) => {
      const updatedUser = { ...request.body };
      fastify.log.info(`Update User: ${updatedUser.email}`);
      reply.code(201);
      return await collection.updateOne(
        { email: updatedUser.email },
        { $set: updatedUser }
      );
    }
  );

  // TODO: Crear el registro de usuarios
  // nuevos tanto en el flujo de fastify como
  // añadirlos a traves de un servicio usersService
  fastify.get(
    '/userslist',
    { preValidation: [fastify.validateJWT] },
    async (request, reply) => {
      const usersList = await collection.find().toArray();
      if (usersList.length === 0) {
        reply.code(404);
        throw new Error('No Document found');
      } // If
      return usersList;
    }
  );

  fastify.get(
    '/users/:username',
    { preValidation: [fastify.validateJWT] },
    async (request, reply) => {
      const requestedUser = await collection.findOne({
        username: request.params.username,
      });
      if (!requestedUser) {
        reply.code(404);
        throw new Error('No Document found');
      } // If
      return requestedUser;
    }
  );
};
