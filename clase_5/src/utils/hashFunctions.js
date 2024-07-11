import bcrypt from "bcrypt";

export function createHash(password) {
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  return hashPassword;
}

export function comparePassword(password, hashPassword) {
  const isPasswordCorrect = bcrypt.compareSync(password, hashPassword);

  return isPasswordCorrect;
}
