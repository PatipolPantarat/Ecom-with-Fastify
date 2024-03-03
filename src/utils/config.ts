const fastify = require("fastify")();
const fastifyEnv = require("@fastify/env");

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  confKey: "config", // optional, default: 'config'
  schema: schema,
};

fastify.register(fastifyEnv, options).ready((err: any) => {
  if (err) console.error(err);

  console.log(fastify.config); // or fastify[options.confKey]
  // output: { PORT: 3000 }
});

export default fastify;
