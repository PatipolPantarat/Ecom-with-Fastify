export const getCategoriesSchema = {
  schema: {
    tags: ["Category"],
    description: "Get a list of categories",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
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

export const getCategorySchema = {
  schema: {
    tags: ["Category"],
    description: "Get a single category",
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
        },
      },
    },
  },
};

export const createCategorySchema = {
  schema: {
    tags: ["Category"],
    description: "Create a new category",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        status: { type: "string" },
      },
      required: ["name", "status"],
    },
    response: {
      201: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
          isDeleted: { type: "boolean" },
        },
      },
    },
  },
};

export const updateCategorySchema = {
  schema: {
    tags: ["Category"],
    description: "Update a category",
    body: {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
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

export const deleteCategorySchema = {
  schema: {
    tags: ["Category"],
    description: "Delete a category",
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
