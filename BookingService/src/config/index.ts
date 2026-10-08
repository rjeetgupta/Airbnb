import "dotenv/config";

type EnvConfig = {
  PORT: number;
}

export const envConfig: EnvConfig = {
  PORT: Number(process.env.PORT) || 3001,
}