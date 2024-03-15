import joi from "joi";

const updateUserJoiSchema = joi.object({
  fullName: joi.string(),
  birthDate: joi.date(),
  phoneNumber: joi.string(),
  imageUrl: joi.string(),
});

export default updateUserJoiSchema;
