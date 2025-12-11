import express from "express";
const router=express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllContacts, getMessageByUserId, sendMessage , getChatPartners} from "../controllers/message.controller.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";


router.use(arcjetProtection,protectRoute);
router.get("/contacts", getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;