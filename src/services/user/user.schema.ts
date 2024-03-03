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
          _id: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
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
    body: {
      type: "object",
      properties: {
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
