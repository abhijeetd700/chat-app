import express from "express"
import { getUsersSidebar } from "../controllers/user.js";
import auth from "../middleware/authenticate.js";

const router = express.Router();

//Get all conversations list of users for current logged in user
router.get("/",auth,getUsersSidebar)

export default router