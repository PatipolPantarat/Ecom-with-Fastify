export const getProductsSchema = {
  schema: {
    description: "Get a list of products",
    tags: ["Product"],
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

export const getProductSchema = {
  schema: {
    description: "Get a single product",
    tags: ["Product"],
    response: {
      200: {
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
};

export const createProductSchema = {
  schema: {
    description: "Create a new product",
    tags: ["Product"],
    body: {
      type: "object",
      required: ["name", "description", "price"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
      },
    },
    response: {
      201: {
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
};

export const updateProductSchema = {
  schema: {
    description: "Update a product",
    tags: ["Product"],
    body: {
      type: "object",
      required: ["name", "description", "price"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
      },
    },
    response: {
      200: {
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
};

export const deleteProductSchema = {
  schema: {
    description: "Delete a product",
    tags: ["Product"],
    response: {
      200: {
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
};
