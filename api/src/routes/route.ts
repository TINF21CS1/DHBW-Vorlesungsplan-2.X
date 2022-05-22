import express from "express";
import { app } from "../app";
import StatusController from "../controller/status.controller"
import UserController from "../controller/user.controller";

const router = express.Router();

router.get("/status", async (_req, res) => {
    const controller = new StatusController();
    const response = await controller.getStatus();
    return res.status(200).send(response);
});

router.get("/user", async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser();
    return res.status(200).send(response);
});

export default router;