import { configDotenv } from 'dotenv';
configDotenv();

class EnvConfig {
  PORT: string;
  PUBLIC_FE_URL: string;
  PUBLIC_API_URL: string;
  DB_CONNECTION_URI: string;
  DB_NAME: string;
  SECRET_KEY: string;
  SENDGRID_API_KEY: string;
  SENDGRID_MAIL_SENDER: string;
  SENDGRID_VERIFY_MAIL_TEMPLATE_ID: string;
  SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CIENT_SECRET: string;

  constructor() {
    // Server PORT:
    this.PORT = process.env.PORT;

    // Database:
    this.DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
    this.DB_NAME = process.env.DB_NAME;
    this.SECRET_KEY = process.env.SECRET_KEY;
    this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    this.SENDGRID_MAIL_SENDER = process.env.SENDGRID_MAIL_SENDER;
    this.SENDGRID_VERIFY_MAIL_TEMPLATE_ID =
      process.env.SENDGRID_VERIFY_MAIL_TEMPLATE_ID;
    this.SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID =
      process.env.SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID;

    // Domain:
    this.PUBLIC_FE_URL = process.env.PUBLIC_FE_URL;
    this.PUBLIC_API_URL = process.env.PUBLIC_API_URL;

    // Google Auth:
    this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    this.GOOGLE_CIENT_SECRET = process.env.GOOGLE_CIENT_SECRET;
  }
}

const envConfig = new EnvConfig();

export { envConfig };
