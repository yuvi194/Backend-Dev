import express from "express";
import requestLogger from "../middleaware/requestLogger.js";
import { createUser, userLogin, verifyLogin } from "../middleaware/user.controller.js";

const router = express.Router();

router.use(requestLogger);

router.post("/signup",createUser);
router.get("/login",userLogin)
router.get("/otpLogin",verifyLogin)

 
 
export default router;