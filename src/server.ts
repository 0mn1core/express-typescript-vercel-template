import express, { type Express } from "express";
// Set up express async error handling
import "express-async-errors"
import cors from "cors";

// Router imports
import kvRouterCreator from "./routers/kv";

const app: Express = express();

// Middlewares
app.use(cors());

// Routes
app.get('/', (_req, res) =>{
  res.send("Express Typescript Server");
});

// Routers
app.use("/kv", kvRouterCreator(app));

export { app }
