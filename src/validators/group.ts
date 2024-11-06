import Joi from "joi";

export default class GroupValidator {
  static createGroup() {
    return Joi.object({
      name: Joi.string().required().min(2),
      visibility: Joi.string().valid("public", "private").required(),
      description: Joi.string().required(),
    });
  }

  static updateGroup() {
    return Joi.object({
      name: Joi.string().required().min(2),
      visibility: Joi.string().valid("public", "private").required(),
      description: Joi.string().required(),
    });
  }

  static addMembers() {
    return Joi.object({
      userIds: Joi.array().required(),
    });
  }

  static addAdmin() {
    return Joi.object({
      userId: Joi.string().required(),
    });
  }
}
