import express from "express";
const router = express.Router();
import { scrape } from "../controllers/scrape.controller.js";

router.get("/:productId", scrape);

export default router;