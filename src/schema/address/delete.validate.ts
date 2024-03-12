import joi from "joi";

const deleteAddressJoiSchema = joi.object({
  userId: joi.string().required(),
  addressId: joi.string().required(),
});

export default deleteAddressJoiSchema;
