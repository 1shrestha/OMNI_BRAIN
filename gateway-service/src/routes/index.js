import { Router } from "express";
import docRoutes from "./doc.routes.js";
import chatRoutes from "./chat.routes.js";

const router = Router();

router.use("/documents", docRoutes);
router.use("/chat", chatRoutes);

export default router;