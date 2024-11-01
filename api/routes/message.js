import express from "express"
import { getMessage, sendMessage } from "../controllers/message.js";
import auth from "../middleware/authenticate.js";

const router = express.Router();

//Get message between current logged in user & the user that we want by passing his "id" as req params
router.get("/:id",auth,getMessage)
//Send message to user whose id is mentioned as req params
router.post("/send/:id",auth,sendMessage)

export default router