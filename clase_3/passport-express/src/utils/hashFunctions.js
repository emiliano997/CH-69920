import bcrypt from "bcrypt";

export function createHash(password) {
  // const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(15));

  return hashPassword;
}

export function comparePassword(password, hashPassword) {
  // const isPasswordCorrect = await bcrypt.compare(password, hashPassword);
  const isPasswordCorrect = bcrypt.compareSync(password, hashPassword);

  // Devolver booleano
  return isPasswordCorrect;
}
