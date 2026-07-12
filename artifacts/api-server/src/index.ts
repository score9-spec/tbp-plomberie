import dns from "node:dns";
import app from "./app";
import { logger } from "./lib/logger";

// Some hosts (e.g. Render) have no IPv6 egress; Node's default DNS order can
// still pick the AAAA record for smtp.gmail.com and fail with ENETUNREACH.
dns.setDefaultResultOrder("ipv4first");

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
