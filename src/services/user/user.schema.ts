export const getUsersSchema = {
  schema: {
    description: "Get a list of users",
    tags: ["User"],
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            fullName: { type: "string" },
            phoneNumber: { type: "string" },
            imageUrl: { type: "string" },
            addresses: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  _id: { type: "string" },
                  name: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                  province: { type: "string" },
                  district: { type: "string" },
                  subdistrict: { type: "string" },
                  zipCode: { type: "string" },
                },
              },
            },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
            isDeleted: { type: "boolean" },
          },
        },
      },
    },
  },
};
export const getUserSchema = {
  schema: {
    description: "Get a list of users",
    tags: ["User"],
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
          fullName: { type: "string" },
          phoneNumber: { type: "string" },
          imageUrl: { type: "string" },
          addresses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string" },
                phone: { type: "string" },
                address: { type: "string" },
                province: { type: "string" },
                district: { type: "string" },
                subdistrict: { type: "string" },
                zipCode: { type: "string" },
              },
            },
          },
          orders: {
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
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
        },
      },
    },
  },
};
export const createUserSchema = {
  schema: {
    description: "Create a new user",
    tags: ["User"],
    body: {
      type: "object",
      required: ["email", "password", "role"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
        role: { type: "string" },
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

// can update role only
export const updateUserSchema = {
  schema: {
    description: "Update a user",
    tags: ["User"],
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string" },
      },
      required: ["authorization"],
    },
    body: {
      type: "object",
      properties: {
        fullName: { type: "string" },
        phoneNumber: { type: "string" },
        imageUrl: { type: "string" },
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

export const deleteUserSchema = {
  schema: {
    tags: ["User"],
    description: "Delete a user",
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
