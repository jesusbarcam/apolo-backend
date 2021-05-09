const port = process.env.PORT || 8080;

// Require the framework and instantiate it
// and activate logger in fastify
const fastify = require('fastify')({
  logger: { prettyPrint: true },
});

// Declare all routes
fastify.register(require('@plugins/authentication')).after(() => {
  fastify
    .get('/', async (request, replay) => {
      return { greetings: 'Vinyl Deejays' };
    })
    .post(
      '/users',
      { preValidation: fastify.auth([fastify.validateJWT]) },
      (request, reply) => {
        console.log(request.body);
        reply.send({
          users: [
            {
              name: 'Jesus Barajas Camacho',
              email: 'jesusbarcam@gmail.com',
            },
            {
              name: 'David Sanchez Camino',
              email: 'davidsanchez@gmail.com',
            },
            {
              name: 'Angel Luis Gutierrez',
              email: 'angelluis@gmail.com',
            },
            { name: 'Sergio Araujo', email: 'yegui@gmail.com' },
          ],
        });
      }
    );
});

// Init function, launch fastify server
const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  } // TryCatch
}; // Start

start();
