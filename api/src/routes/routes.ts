import {Express, Request, Response} from "express";
import { Controller,ValidationService,FieldErrors, ValidateError, TsoaRoute } from "tsoa";
import {UserController} from "../controller/createUserController"

const userController = new UserController();

export function RegisterRoutes(app: Express) {
    app.get('/user',(req:Request,res:Response) => userController.createUser
    );
 }