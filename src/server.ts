import express, { type Express } from "express";
import cors from "cors";

const app: Express = express();

// Middlewares
app.use(cors());

// Routes
app.get('/', (_req, res) =>{
  res.send("Express Typescript Server");
});

export { app }
