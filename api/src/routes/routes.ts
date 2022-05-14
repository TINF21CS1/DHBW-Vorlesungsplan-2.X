import {Express, Request, Response} from "express";
import prisma from "../app"

function routes(app: Express){
    /**
     * @openapi 
     * /test
     * for postman... -> pls no swagger
     */
    app.get("/api/user", (req: Request, res: Response) =>{
        prisma.user.findMany.then((users)=>{
            res.status(200).json({users})
        }).catch((err)=>{
            res.status(404).json({error: 'Error'})
        })
    }
    app.post("/api/user", (req: Request, res: Response) => {
        const {email, name} = req.body

        prisma.user.create({data: {email,name}}).then((user) => {
            res.status(200).json({user})
        }).catch((err) => {
            res.status(404).json({error: 'Error'})
        })
    })
    //app.delete("/api/user")

}   