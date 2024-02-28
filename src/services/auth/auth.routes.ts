import { FastifyInstance, RouteShorthandOptions } from "fastify";
import fastifyJwt from "@fastify/jwt";

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
      },
    },
  },
};

async function routes(fastify: FastifyInstance) {
  fastify.get("/", async (req, reply) => {
    return reply.code(200).send({ message: "hello auth" });
  });
  fastify.post("/login", async (req, reply) => {
    // Authenticate user (compare against database or external auth provider)
    const { username, password } = req.body as any;

    if (username === "test" && password === "test") {
      const token = fastify.jwt.sign({ username });
      return { token };
    } else {
      return reply.code(401).send({ error: "Invalid credentials" });
    }
  });
}

export default routes;
