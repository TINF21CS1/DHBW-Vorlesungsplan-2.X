import {Express, Request, Response} from "express";

function routes(app: Express){
    /**
     * @openapi 
     * /test
     * for postman... -> pls no swagger
     */
    app.post("/api/user", (req: Request, res: Response) => res.sendStatus(200));
    app.delete("/api/user")

}   