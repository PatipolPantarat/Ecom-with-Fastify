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
          message: { type: "string" },
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
          message: { type: "string" },
        },
      },
    },
  },
};

export const resetPasswordSchema = {
  schema: {
    tags: ["Auth"],
    description: "Reset password",
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string" },
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

export const changePasswordSchema = {
  schema: {
    tags: ["Auth"],
    description: "Change password",
    body: {
      type: "object",
      required: ["email", "oldPassword", "newPassword"],
      properties: {
        email: { type: "string" },
        oldPassword: { type: "string" },
        newPassword: { type: "string" },
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
