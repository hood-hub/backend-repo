import Joi from "joi";

export default class MessageValidator {
  static createMessage() {
    return Joi.object({
      content: Joi.string().required().min(2),
      media: Joi.array(),
      group: Joi.string(),
      directMessage: Joi.string(),
    });
  }

  static createDirectMessage() {
    return Joi.object({
      firstParty: Joi.string().required(),
      secondParty: Joi.string().required(),
    });
  }
}
