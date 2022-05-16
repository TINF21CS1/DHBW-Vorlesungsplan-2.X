import express from 'express';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import helmet from 'helmet'
import * as swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';

const app = express();

app.set('json spaces', 4);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

import swaggerDoc from "../swagger.json"

//mit seinem bspw. mit undefined ein Fehler. So geht es aber...
app.use("/docs", swaggerUi.serve,swaggerUi.setup(swaggerDoc));

RegisterRoutes(app);




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