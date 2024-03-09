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
