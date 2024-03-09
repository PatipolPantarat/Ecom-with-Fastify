import joi from "joi";

const updateUserJoiSchema = joi.object({
  // userProfile
  role: joi.string().valid("admin", "user").required(),
  fullName: joi.string(),
  phoneNumber: joi.string(),
  imageUrl: joi.string(),
  birthDate: joi.date(),
  // userAddress
  name: joi.string(),
  phone: joi.string(),
  address: joi.string(),
  province: joi.string(),
  district: joi.string(),
  subdistrict: joi.string(),
  zipCode: joi.string(),
  // userFavorites
  favorites: joi.array().items(joi.string()),
});

export default updateUserJoiSchema;
