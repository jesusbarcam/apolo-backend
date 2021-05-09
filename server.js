const port = process.env.PORT || 8080;

// Require the framework and instantiate it
// and activate logger in fastify
const fastify = require('fastify')({
  logger: { prettyPrint: true },
});

// Declare all routes
fastify.register(require('@plugins/authentication')).after(() => {
  fastify
    .register(require('@routes/users'))
    .get('/', async (request, replay) => {
      return { greetings: 'Vinyl Deejays' };
    });
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
