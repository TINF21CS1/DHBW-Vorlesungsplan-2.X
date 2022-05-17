import express from "express";
import { app } from "../app";
//import { Controller,ValidationService,FieldErrors, ValidateError, TsoaRoute } from "tsoa";
import UserController from "../controller/user.controller"
//const userController = new UserController();

const router = express.Router();

app.get("/ping", async (_req, res) => {
    const controller = new UserController();
    const response = await controller.createUser();
    return res.send(response);
});

export default router;