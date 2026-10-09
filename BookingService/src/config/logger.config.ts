import pino from "pino";
import { join } from "path";
import { getCorrelationId } from "../utils/helpers/request.helpers";

const LOG_DIR = join(process.cwd(), "logs");

const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
    timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
    messageKey: "message",
    base: undefined, // removes pid and hostname

    formatters: {
      log(obj: Record<string, unknown>) {
        return Object.keys(obj).length > 0 ? { data: obj } : {};
      },
    },

    mixin() {
      const correlationId = getCorrelationId();
      return correlationId ? { correlationId } : {};
    },
  },
  pino.transport({
    targets: [
      {
        target: "pino/file",
        level: "info",
        options: { destination: 1 }, // stdout
      },
      {
        target: "pino-roll",
        level: "info",
        options: {
          file: join(LOG_DIR, "app.log"),
          frequency: "daily",
          size: "20m",
          limit: { count: 14 },
          mkdir: true,
        },
      },
      // TODO: add pino-mongodb target
    ],
  }),
);

export default logger;