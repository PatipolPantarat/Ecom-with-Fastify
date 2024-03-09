import joi from "joi";

const createAddressJoiSchema = joi.object({
  userId: joi.string().required(),
  name: joi.string().required(),
  phone: joi.string().required(),
  address: joi.string().required(),
  province: joi.string().required(),
  district: joi.string().required(),
  subdistrict: joi.string().required(),
  zipCode: joi.string().required(),
});

export default createAddressJoiSchema;
