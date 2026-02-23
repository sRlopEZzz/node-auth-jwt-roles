import dotenv from "dotenv";
dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
  DEV_BYPASS_AUTH: process.env.DEV_BYPASS_AUTH || "false",
};

export default config;