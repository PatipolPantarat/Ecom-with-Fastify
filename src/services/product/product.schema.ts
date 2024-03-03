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
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: {
              type: "string",
            },
            stock: { type: "number" },
            image: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
            isDeleted: { type: "boolean" },
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
          _id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: {
            type: "string",
          },
          stock: { type: "number" },
          image: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
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
      required: ["name", "description", "price", "category", "stock", "image"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        category: {
          type: "string",
        },
        stock: { type: "number" },
        image: { type: "string" },
        status: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number" },
          category: {
            type: "string",
          },
          stock: { type: "number" },
          image: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
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
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        category: {
          type: "string",
        },
        stock: { type: "number" },
        image: { type: "string" },
        status: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        isDeleted: { type: "boolean" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
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
          message: { type: "string" },
        },
      },
    },
  },
};
