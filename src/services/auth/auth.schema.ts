export const getUsersSchema = {
  schema: {
    tags: ["Auth"],
    description: "Get a list of users",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
  },
};

export const loginSchema = {
  schema: {
    tags: ["Auth"],
    description: "Login",
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
      },
    },
  },
};

export const registerSchema = {
  schema: {
    tags: ["Auth"],
    description: "Register",
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
      },
    },
  },
};
