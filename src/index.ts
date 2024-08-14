// Configure environment
import './common/utils/loadEnv';

import { app } from "./server";

// Start Express server
const server = app.listen(process.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = process.env;
  console.log(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

// Handler for closing
const onCloseSignal = () => {
  console.log('Received terminate/interrupt signal, shutting server down.');
  server.close(() => {
    console.log('Server has shut down, exiting process.');
    process.exit();
  });
  // Force shutdown
  setTimeout(
    () => {
      console.log("Server has not shut down after 10 seconds, forcing exit.")
      process.exit(1)
    },
    10000
  )
  .unref();
};

// Attach handlers for interrupt and terminate signals
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
