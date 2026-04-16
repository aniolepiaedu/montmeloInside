import express from "express";
import { login, registre } from "../controllers/LoginRegistre.js";

const router = express.Router();

router.post("/register", registre);
router.post("/login", login);

export default router;