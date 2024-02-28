export const getProductsSchema = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
          },
        },
      },
    },
  },
};

export const testswagger = {
  schema: {
    description: "Get a list of users",
    tags: ["user"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
      },
    },
  },
  handler: async (request: any, reply: any) => {
    return reply.send({ id: 1, name: "test" });
  },
};
