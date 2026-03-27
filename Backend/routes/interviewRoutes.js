import express from "express";
import { interviewHandler } from "../controller/interviewController.js";

const router = express.Router();

router.post("/interview", interviewHandler);

export default router;
