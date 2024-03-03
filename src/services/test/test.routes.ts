import { FastifyInstance } from "fastify";
import TestModel from "../../models/test.model";
import { ProductModel } from "../../models/product.model";

async function routes(fastify: FastifyInstance) {
  // GET /test - List all test

  // GET /test/:id - Get a single test

  // POST /test - Create a new test
  fastify.post("/", async (req: any, reply: any) => {
    const { username, password, role } = req.body;
    console.log(
      "username: ",
      username,
      "\npassword: ",
      password,
      "\nrole: ",
      role
    );
    const newTest = new TestModel({
      username,
      password,
      role,
    });
    console.log(newTest);
    await newTest.save();
    return reply.send(newTest);
  });

  // PUT /test/:id - Update a test

  // DELETE /test/:id - Delete a test
}

export default routes;
