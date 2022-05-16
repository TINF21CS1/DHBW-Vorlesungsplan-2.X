import {Express, Request, Response} from "express";
import { Controller,ValidationService,FieldErrors, ValidateError, TsoaRoute } from "tsoa";
//import {UserController} from "../controller/createUserController"
import {ServerStatusController} from "../app/server-status/server-status.router"
const userController = new ServerStatusController();

export function RegisterRoutes(app: Express) {
    app.get('/user',(req:Request,res:Response) => userController.getServerStatus
  
    //app.get('/user',(req:Request,res:Response) => userController.createUser(req,res)
    );
 }