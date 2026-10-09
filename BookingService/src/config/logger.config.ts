import pino from "pino";
import { getCorrelationId } from "../utils/helpers/request.helpers";
import { join } from "path";

const getFormattedTimestamp = () => {
  const now = new Date();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const YYYY = now.getFullYear();
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${ss}`;
};

const logger = pino(
  {
    level: "info",
    timestamp: () => `,"timestamp":"${getFormattedTimestamp()}"`,
    formatters: {
      level(label) {
        return { level: label };
      },
      log(obj: any) {
        const { message, timestamp, time, level, hostname, pid, ...data } = obj;
        if (Object.keys(data).length > 0) {
          return { data } as any;
        }
        return {};
      },
    },
    mixin() {
      return {
        correlationId: getCorrelationId(),
      };
    },
    messageKey: "message",
    base: undefined, // remove pid, hostname
  },
  pino.transport({
    targets: [
      {
        target: "pino/file",
        level: "info",
        options: {
          destination: 1,
        },
      },
      {
        target: "pino-roll",
        level: "info",
        options: {
          file: join("logs", "app.log"),
          frequency: "daily",
          size: "20m",
          limit: {
            count: 14,
          },
          mkdir: true,
        },
      },
      // TODO: add logic to integrate and save logs in mongo
    ],
  }),
);

export default logger;
