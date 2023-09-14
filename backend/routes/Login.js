import express from "express";
import { register, login, checkUser } from "../controllers/Login.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", authenticate, checkUser);

export default router;
