import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuari from "../models/Usuaris.js";

// REGISTRE
export const registre = async (req, res) => {
  try {
    console.log("BODY REBUT:", req.body);
    const { name, email, password, confirmPassword } = req.body;

    // validació bàsica
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Falten camps" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les contrasenyes no coincideixen" });
    }

    const exists = await Usuari.findOne({ correu: email });
    if (exists) {
      return res.status(400).json({ message: "Usuari ja existeix" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Usuari({
      nom_complet: name,
      correu: email,
      contrasenya: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Usuari creat correctament",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error servidor", error });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuari.findOne({ correu: email });
    if (!user) {
      return res.status(400).json({ message: "Usuari no existeix" });
    }

    const valid = await bcrypt.compare(password, user.contrasenya);
    if (!valid) {
      return res.status(400).json({ message: "Contrasenya incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login correcte",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error servidor", error });
  }
};