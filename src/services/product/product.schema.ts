export const getProductsSchema = {
  schema: {
    tags: ["Product"],
    description: "Get a list of products",
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
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" },
                status: { type: "string" },
              },
            },
            stock: { type: "number" },
            sold: { type: "number" },
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
    tags: ["Product"],
    description: "Get a single product",
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
          sold: { type: "number" },
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
    tags: ["Product"],
    description: "Create a new product",
    body: {
      type: "object",
      required: [
        "name",
        "description",
        "price",
        "category",
        "stock",
        "sold",
        "image",
      ],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        category: {
          type: "string",
        },
        stock: { type: "number" },
        sold: { type: "number" },
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
          sold: { type: "number" },
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
    tags: ["Product"],
    description: "Update a product",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        category: {
          type: "string",
        },
        stock: { type: "number" },
        sold: { type: "number" },
        image: { type: "string" },
        status: { type: "string" },
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
    tags: ["Product"],
    description: "Delete a product",
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
