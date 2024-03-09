import joi from "joi";

const updateAddressJoiSchema = joi.object({
  userId: joi.string().required(),
  addressId: joi.string().required(),
  name: joi.string(),
  phone: joi.string(),
  address: joi.string(),
  province: joi.string(),
  district: joi.string(),
  subdistrict: joi.string(),
  zipCode: joi.string(),
});

export default updateAddressJoiSchema;
