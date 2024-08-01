import Joi from "joi";

export class ContactDto {
  constructor(firstName, lastName, email, phone, address) {
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

export const contactDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});
