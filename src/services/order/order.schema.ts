export const getOrdersSchema = {
  schema: {
    tags: ["Order"],
    description: "Get a list of orders",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "number" },
                  price: { type: "number" },
                },
              },
            },
            total_price: { type: "number" },
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

export const getOrderSchema = {
  schema: {
    tags: ["Order"],
    description: "Get a single orders",
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          userId: { type: "string" },
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: { type: "string" },
                quantity: { type: "number" },
                price: { type: "number" },
              },
            },
          },
          total_price: { type: "number" },
          status: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
        },
      },
    },
  },
};

export const createOrderSchema = {
  schema: {
    tags: ["Order"],
    description: "Create a new order",
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: { type: "string" },
              quantity: { type: "number" },
              price: { type: "number" },
            },
          },
        },
        total_price: { type: "number" },
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

export const updateOrderSchema = {
  schema: {
    tags: ["Order"],
    description: "Update a order",
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: { type: "string" },
              quantity: { type: "number" },
              price: { type: "number" },
            },
          },
        },
        total_price: { type: "number" },
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

export const deleteOrderSchema = {
  schema: {
    tags: ["Order"],
    description: "Delete a order",
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

export const changeStatusOrderSchema = {
  schema: {
    tags: ["Order"],
    description: "Change status of a order",
    body: {
      type: "object",
      properties: {
        orderId: { type: "string" },
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
