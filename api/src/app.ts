import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
import routes from "./routes/routes"
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../tsoa/routes';
import { getRoutes } from './app/server-status/server.status.service';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle security and origin in production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

function removeFramefuard(req, res, next) {
  req.removeHeader('X-Frame-Options') //TODO: Disable X-Frame-OPtions in favor of CSP-frame ancestor. Macht Helmet automatisch.
  next()
}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

//RegisterRoutes(app);

//nicht in Produktion!
//app.use("/docs", swaggerUi.serve, async (req: express.Request, res: express.Response) => {
//  return res.send(swaggerUi.generateHTML(await import("../tsoa/swagger.json")));
//});

routes(app); 



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
export default app;