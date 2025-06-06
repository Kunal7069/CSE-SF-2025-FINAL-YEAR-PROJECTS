import express from "express";
import { sendContactMessage } from "../controllers/contact.Controller.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;