import express from "express";
import StatusController from "../controller/status.controller"
import UserController from "../controller/user.controller";
import LoginController from "../controller/login.controller";

const router = express.Router();

router.get("/status", async (_req, res) => {
    const controller = new StatusController();
    const response = await controller.getStatus();
    return res.status(200).send(response);
});

router.post("/user", async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    if(response === "Already Exists"){
        return res.status(409).send(response);
    }
    return res
    .cookie("access_token", response, {
        httpOnly: true,
        expires: new Date(Date.now()+10000),
        secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
      })
    .status(200)
    .json({ message: "Created!" });
});

router.post("/login", async (req, res) => {
    const controller = new LoginController();
    const response = await controller.login(req.body);
    if(response === 'Email or Password wrong...'){
        return res.status(409).send(response);
    }
    return res
    .cookie("access_token", response, {
        httpOnly: true,
        expires: new Date(Date.now()+10000),
       secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
      })
    .status(200)
    .json({ message: "Logged in!" });
});

export default router;