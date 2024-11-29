import Joi from "joi";

export default class UserValidator {
  static signup() {
    return Joi.object({
      firstName: Joi.string().required().min(2),
      lastName: Joi.string().required().min(2),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });
  }

  static signupAdmin() {
    return Joi.object({
      firstName: Joi.string().required().min(2),
      lastName: Joi.string().required().min(2),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });
  }

  static onboard() {
    return Joi.object({
      username: Joi.string().min(2),
      stringAddress: Joi.string().required(),
      geoAddress: Joi.any().required(),
    });
  }

  static updateProfile() {
    return Joi.object({
      firstName: Joi.string().min(2),
      lastName: Joi.string().min(2),
      username: Joi.string().min(2),
      profilePicture: Joi.string(),
      stringAddress: Joi.string(),
      geoAddress: Joi.any(),
    });
  }

  static changePassword() {
    return Joi.object({
      prevPassword: Joi.string().required().min(8),
      newPassword: Joi.string().required().min(8),
    });
  }

  static updateEmergencyContact() {
    return Joi.object({
      emergencyContact: Joi.object().required(),
    });
  }

  static login() {
    return Joi.object({
      emailOrUsername: Joi.string().required(),
      password: Joi.string().required().min(8),
    });
  }

  static resetPassword() {
    return Joi.object({
      emailOrUsername: Joi.string().required(),
      token: Joi.number().required(),
      newPassword: Joi.string().required().min(8),
    });
  }
}
