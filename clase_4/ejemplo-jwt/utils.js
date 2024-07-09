import jwt from "jsonwebtoken";

const PRIVATE_KEY = "s3cr3t";

// Genera un token
export const generateToken = (user) => {
  const payload = {
    user,
  };

  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "2m",
  });
};

// Middleware
// Chequeamos que el token exista y sea válido
export const authToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Falta token",
    });
  }

  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Token no valido",
    });
  }
};
