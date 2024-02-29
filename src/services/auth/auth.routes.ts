import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getUsersSchema, loginSchema, registerSchema } from "./auth.schema";

interface User {
  email: string;
  password: string;
}

const users: User[] = [
  { email: "admin@example.com", password: "admin" },
  { email: "user@example.com", password: "user" },
];

// helper function to find a unique user by email
const findUserByEmail = (users: User[], email: string) => {
  return users.find((user) => user.email === email);
};

async function routes(fastify: FastifyInstance) {
  fastify.get(
    "/users",
    getUsersSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send(users);
    }
  );

  fastify.post(
    "/login",
    loginSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as any;
      if (email === "admin@example.com" && password === "admin") {
        console.log("login successful");
        const token = fastify.jwt.sign({ email });
        console.log(token);
        return reply.code(200).send({ token });
      }
      return reply.code(401).send({ error: "Invalid credentials" });
    }
  );

  fastify.post(
    "/register",
    registerSchema,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as any;
      if (findUserByEmail(users, email)) {
        return reply.code(409).send({ error: "User already exists" });
      }
      users.push({ email, password });
      return reply.code(201).send({ message: "User created successfully" });
    }
  );
}

export default routes;
