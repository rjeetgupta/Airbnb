import app from "./app.js";
import { envConfig } from "./config/index.js";
import logger from "./config/logger.config.js";

app.listen(envConfig.PORT, () => {
  logger.info(`Server is running on http://localhost:${envConfig.PORT}`)
})