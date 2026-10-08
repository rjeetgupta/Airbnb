import app from "./app.js";
import { envConfig } from "./config/index.js";

app.listen(envConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${envConfig.PORT}`)
})