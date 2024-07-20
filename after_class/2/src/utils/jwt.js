import jwt from "jsonwebtoken";

const PRIVATE_KEY = "s3cr3t";

export function generateToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "5m",
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
}
