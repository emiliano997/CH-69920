export function validacion(req, res, next) {
  const { name, age, email } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  if (!age) {
    return res.status(400).json({ error: "El año es obligatorio" });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ error: "El email es obligatorio" });
  }

  next();
}
