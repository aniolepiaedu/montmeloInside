import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuari from "../models/Usuaris.js";

// 🔹 REGISTRO
export const registre = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.json({ message: "Falten camps" });
  }

  if (password !== confirmPassword) {
    return res.json({ message: "No coincideixen" });
  }

  const userExists = await Usuari.findOne({ correu: email });
  if (userExists) {
    return res.json({ message: "Ja existeix" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await Usuari.create({
    nom_complet: name,
    correu: email,
    contrasenya: hash,
  });

  res.json({ message: "Creat", user });
};

// 🔹 LOGIN
export const login = async (req, res) => {
  const { email, password, remember } = req.body;

  const user = await Usuari.findOne({ correu: email });
  if (!user) {
    return res.json({ message: "No existeix" });
  }

  const valid = await bcrypt.compare(password, user.contrasenya);
  if (!valid) {
    return res.json({ message: "Mal password" });
  }

  let token = "";

  if (remember) {
    token = jwt.sign({ id: user._id }, "SECRET_KEY");

    // guardar token
    user.token = token;
    await user.save();
  }

  res.json({ message: "OK", token });
};