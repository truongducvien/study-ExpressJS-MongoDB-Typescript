import { Db, MongoClient } from 'mongodb';
import { envConfig } from '@/config';
import mongoose from 'mongoose';

const uri = envConfig.DB_CONNECTION_URI;
const client = new MongoClient(uri);
const db = client.db(envConfig.DB_NAME);

class DBCore {
  db: Db;

  constructor() {
    this.db = db;
  }

  async connectDB(): Promise<void> {
    if (uri) {
      try {
        // await client.connect();
        await mongoose.connect(uri, {
          dbName: envConfig.DB_NAME
          // serverSelectionTimeoutMS: 2000
        });
        console.log('Connect to database successfully');
      } catch (error) {
        console.log('Connection error: ', error);
      }
    }
  }
}

const dbCore = new DBCore();

export { dbCore };
