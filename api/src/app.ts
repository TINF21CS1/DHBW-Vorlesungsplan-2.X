import express from 'express';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import helmet from 'helmet'
import * as swaggerUi from 'swagger-ui-express';
import Router from './routes/route';

const app = express();

app.set('json spaces', 4);
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//mit seinem bspw. mit undefined ein Fehler. So geht es aber...
app.use("/docs",
 swaggerUi.serve,
 swaggerUi.setup(undefined, {
   swaggerOptions: {
     url: "./tsoa/swagger.json"
   }
 }));

app.use(Router); //TODO: RegisterRoutes



/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send('Generic Error Message');
  next();
});

app.use(function notFoundHandler(_req, res: express.Response) {
  return res.status(404).send({ message: "Not Found" });
});

export const prisma = new PrismaClient();
export {app};