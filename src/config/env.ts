import { configDotenv } from 'dotenv';
configDotenv();

class EnvConfig {
  PORT: string;
  DB_CONNECTION_URI: string;
  DB_NAME: string;
  SECRET_KEY: string;

  constructor() {
    this.PORT = process.env.PORT;
    this.DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
    this.DB_NAME = process.env.DB_NAME;
    this.SECRET_KEY = process.env.SECRET_KEY;
  }
}

const envConfig = new EnvConfig();

export { envConfig };
