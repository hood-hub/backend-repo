import Joi from "joi";

export default class PostValidator {
  static createPost() {
    return Joi.object({
      text: Joi.string().required().min(2),
      media: Joi.array(),
      stringAddress: Joi.string().required(),
      geoAddress: Joi.any().required(),
    });
  }

  static updatePost() {
    return Joi.object({
      text: Joi.string().required().min(2),
      media: Joi.array(),
      stringAddress: Joi.string().required(),
      geoAddress: Joi.any().required(),
    });
  }

  static commentOnPost() {
    return Joi.object({
      body: Joi.string().required().min(2),
    });
  }
}
