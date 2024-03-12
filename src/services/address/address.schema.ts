export const getAddressesSchema = {
  schema: {
    tags: ["Address"],
    description: "Get addresses by user id",
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
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
    },
  },
};

export const createAddressSchema = {
  schema: {
    tags: ["Address"],
    description: "Create a new address",
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        province: { type: "string" },
        district: { type: "string" },
        subdistrict: { type: "string" },
        zipCode: { type: "string" },
      },
      required: [
        "userId",
        "name",
        "phone",
        "address",
        "province",
        "district",
        "subdistrict",
        "zipCode",
      ],
    },
    response: {
      201: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

export const updateAddressSchema = {
  schema: {
    tags: ["Address"],
    description: "Update an address",
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        addressId: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        address: { type: "string" },
        province: { type: "string" },
        district: { type: "string" },
        subdistrict: { type: "string" },
        zipCode: { type: "string" },
      },
      required: ["userId", "addressId"],
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

export const deleteAddressSchema = {
  schema: {
    tags: ["Address"],
    description: "Delete an address by id",
    body: {
      type: "object",
      properties: {
        userId: { type: "string" },
        addressId: { type: "string" },
      },
      required: ["userId", "addressId"],
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
