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
  fastify.addSchema(publicUser);
  fastify.addSchema(publicUsers);
  fastify.addSchema(createUser);

  fastify.post(
    '/users',
    { createUserResponseSchema },
    async (request, reply) => {
      const { username, password, fullName } = request.body;
      fastify.log.info('El usuario ha sido creado');
      reply.code(201);
      return await {
        username: 'jesusBarcam',
        fullName: 'Jesus Barajas Camacho',
        email: 'jesusbarcam@gmail.com',
        tlf: 657448534,
      };
    }
  );
  // TODO: Crear el registro de usuarios
  // nuevos tanto en el flujo de fastify como
  // añadirlos a traves de un servicio usersService
  fastify.get('/users', { usersResponseSchema }, async (request, reply) => {
    // TODO: Obtener el listado de usuarios desde
    // nuestro servicio usersService.
    return await [
      {
        username: 'jesusBarcam',
        fullName: 'Jesus Barajas Camacho',
        email: 'jesusbarcam@gmail.com',
        tlf: 657448534,
      },
      {
        username: 'davlinch',
        fullName: 'David Sanchez Camino',
        email: 'davidsanchez@gmail.com',
        tlf: 657448534,
      },
      {
        username: 'anluz',
        fullName: 'Angel Luis Gutierrez',
        email: 'angelluis@gmail.com',
        tlf: 657448534,
      },
      {
        username: 'yegui',
        fullName: 'Sergio Araujo',
        email: 'yegui@gmail.com',
        tlf: 657448534,
      },
    ];
  });
};
