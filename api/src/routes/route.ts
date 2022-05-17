import express from "express";
import { app } from "../app";
import UserController from "../controller/user.controller"

const router = express.Router();

router.get("/status", async (_req, res) => {
    const controller = new UserController();
    const response = await controller.createUser();
    return res.send(response);
});

export default router;