import express from "express";
import {verifyUser} from "../utils/verifyUser.js";
import { test,updateUser,deleteUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyUser ,updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);

export default router;