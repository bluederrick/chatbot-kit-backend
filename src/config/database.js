import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import logger from "../utils/Loggers";
dotenv.config();
const { MONGO_URI } = process.env;



const client = new MongoClient(MONGO_URI, {
  maxPoolSize: 150,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
  },
});

class Database {
  constructor(uri = MONGO_URI) {
    this.uri = uri;
  }

  async connect() {
    try {
      await client.connect();
      logger.info("MongoDB connected successfully");
    } catch (error) {
      logger.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }
}

export { Database, client };
