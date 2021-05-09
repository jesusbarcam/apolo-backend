'use strict';

//const { usersService } = require('usersService');
const { publicUser, publicUsers, usersSchema } = require('./users.schema');

module.exports = async function (fastify, options) {
  fastify.addSchema(publicUser);
  fastify.addSchema(publicUsers);
  fastify.get('/users', { usersSchema }, async (request, reply) => {
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
