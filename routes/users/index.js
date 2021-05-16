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
    { createUserResponseSchema },
    async (request, reply) => {
      const userToInsert = { ...request.body };
      fastify.log.info(
        `Intentando crear el usuario: ${userToInsert.toString()}`
      );
      reply.code(201);
      return await collection.insertOne(userToInsert);
    }
  );

  fastify.put('/users', async (request, reply) => {
    const updatedUser = { ...request.body };
    fastify.log.info(`Update User: ${updatedUser.username}`);
    reply.code(201);
    return await collection.updateOne(
      { username: 'jesusbarcam' },
      { $set: updatedUser }
    );
  });

  fastify.get('/users/:username', async (request, reply) => {
    const requestedUser = await collection.findOne({
      username: request.params.username,
    });
    if (!requestedUser) {
      reply.code(404);
      throw new Error('No Document found');
    } // If
    return requestedUser;
  });

  // TODO: Crear el registro de usuarios
  // nuevos tanto en el flujo de fastify como
  // añadirlos a traves de un servicio usersService
  fastify.get('/users', { usersResponseSchema }, async (request, reply) => {
    const usersList = await collection.find().toArray();
    if (usersList.length === 0) {
      reply.code(404);
      throw new Error('No Document found');
    } // If
    return usersList;
  });
};
