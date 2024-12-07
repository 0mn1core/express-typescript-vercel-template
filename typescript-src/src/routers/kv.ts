import express, { type Express, Router } from "express";
import redis from "../common/db/upstash/redis-instance";

const kvRouterCreator = (app: Express): Router => {
  // Constants
  const TEST_STRING = 'test:string';
  const TEST_STRING_VALUE = 'Test String Value';

  const TEST_HASH = 'test:hash';
  const TEST_HASH_VALUE = {
    test_hash_property_one: 'Test Hash Value 1',
    test_hash_property_two: 'Test Hash Value 2'
  };

  const TEST_JSON = 'test:json';
  const TEST_JSON_VALUE_BASE = {
    initial_set: {
      foo: 'bar'
    },
    later_set: ""
  }

  const router = express.Router();

  // GET method for the test string
  router.get('/string', async (_req, res, _next) => {
    await redis.set(TEST_STRING, TEST_STRING_VALUE);
    const value = await redis.get(TEST_STRING);

    res.send(`Redis string ${TEST_STRING} is set to ${value}`);
  });

  // GET method for the test hash
  router.get('/hash', async (_req, res, _next) => {
    await redis.hset(TEST_HASH, TEST_HASH_VALUE)
    const hashValue = await redis.hgetall(TEST_HASH);

    res.send(`Redis hash ${TEST_HASH} is set to:\n${JSON.stringify(hashValue, null, 2)}`);
  });

  // GET method for test JSON
  router.get('/json', async(_req, res, _next) => {
    await redis.json.set(TEST_JSON, '$', TEST_JSON_VALUE_BASE);
    await redis.json.set(TEST_JSON, '$.later_set', { baz: 'bat'});
    const jsonValue = await redis.json.get(TEST_JSON, '$')

    res.json(jsonValue)
  })

  return router
}

export default kvRouterCreator