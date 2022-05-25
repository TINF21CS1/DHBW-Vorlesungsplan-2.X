import express from "express";
import StatusController from "../controller/status.controller"
import UserController from "../controller/user.controller";
import LoginController from "../controller/login.controller";
import { User } from '@prisma/client';

const router = express.Router();

router.get("/status", async (_req, res) => {
    const controller = new StatusController();
    const response = await controller.getStatus();
    return res.status(200).send(response);
});

/*router.get("/user", async (req, res) => {
    const controller = new UserController();
    const response = await controller.fetchUsers();
    return res.status(200).send(response);
});*/

router.post("/user", async (req, res) => {
    const controller = new UserController();
    const response = await controller.createUser(req.body);
    if(typeof response === 'string'){
        return res.status(409).send(response);
    }
    return res
    .cookie("access_token", <User>response.salt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
      })
    .status(200)
    .json({ message: "Created!" });
});

router.post("/login", async (req, res) => {
    const controller = new LoginController();
    const response = await controller.login(req.body);
    if(typeof response === 'string'){
        return res.status(409).send(response);
    }
    return res
    .cookie("access_token", <User>response.salt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",//expire eh durch JWT gegeben.
      })
    .status(200)
    .json({ message: "Logged in!" });
});


/*router.get("/user/:id", async (req, res) => {
    const controller = new UserController();
    const response = await controller.getUserByEmail(req.params.id);
    return res.send(response);
  });*/

export default router;