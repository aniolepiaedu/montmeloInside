import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuari from "../models/Usuaris.js";

export const registre = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

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

    const user = await Usuari.create({
      nom_complet: name,
      correu: email,
      contrasenya: hashedPassword,
      token: "",
      notificacions: {},
      historial_navegacio: [],
      ubicacioUsuari: null,
      esdeveniment: null,
    });

    return res.status(201).json({
      message: "Usuari creat",
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: "Error servidor" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    const user = await Usuari.findOne({ correu: email });

    if (!user) {
      return res.status(400).json({ message: "Usuari no existeix" });
    }

    const ok = await bcrypt.compare(password, user.contrasenya);

    if (!ok) {
      return res.status(400).json({ message: "Contrasenya incorrecta" });
    }
    let token = "";

    if (remember) {
      token = jwt.sign(
        { id: user._id },
        "SECRET_KEY",
        { expiresIn: "7d" }
      );
    }

    res.json({
      message: "Login correcte",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Error servidor" });
  }
};