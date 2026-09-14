import { Router } from "express";
import { analyzeSource, getDocuments } from "../controllers/doc.controller.js";

const router = Router();

router.post("/analyze", analyzeSource);
router.get("/", getDocuments);

export default router;