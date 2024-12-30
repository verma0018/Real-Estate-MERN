import express from "express";
import {verifyUser} from "../utils/verifyUser.js";
import { test,updateUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyUser ,updateUser);

export default router;