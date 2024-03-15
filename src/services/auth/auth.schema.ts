export const meSchema = {
  schema: {
    tags: ["Auth"],
    description: "Get current user",
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string" },
      },
      required: ["authorization"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          email: { type: "string" },
          role: { type: "string" },
          fullName: { type: "string" },
          phoneNumber: { type: "string" },
          imageUrl: { type: "string" },
          favorites: {
            type: "array",
            items: {
              type: "string",
            },
          },
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
              type: "string",
            },
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
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
          token: { type: "string" },
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
        oldPassword: { type: "string" },
        newPassword: { type: "string" },
      },
      required: ["oldPassword", "newPassword"],
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
