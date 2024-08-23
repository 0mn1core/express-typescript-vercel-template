import express, { type Express, Router } from "express";
import {kv} from "@vercel/kv"

const kvRouterCreator = (app: Express): Router => {
  // Constants
  const TEST_STRING = 'test:string';
  const TEST_HASH = 'test:hash';

  const router = express.Router();

  // GET method for the test string
  router.get('/string', async (_req, res, _next) => {
    const value = await kv.get(TEST_STRING);

    res.send(`Redis string ${TEST_STRING} is set to ${value}`);
  });

  // GET method for the test hash
  router.get('/hash', async (_req, res, _next) => {
    const hashValue = await kv.hgetall(TEST_HASH);

    res.send(`Redis hash ${TEST_HASH} is set to:\n${JSON.stringify(hashValue, null, 2)}`);
  });

  return router
}

export default kvRouterCreator