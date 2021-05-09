'use strict';

//const { usersService } = require('usersService');

module.exports = async function (fastify, options) {
  fastify.addSchema({
    $id: 'publicUser',
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      tlf: { type: 'number' },
    },
  });

  fastify.addSchema({
    $id: 'users',
    type: 'array',
    items: { $ref: 'publicUser#' },
  });

  const schema = {
    response: {
      200: { $ref: 'users#' },
    },
  };

  fastify.get('/users', { schema }, async (request, reply) => {
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
