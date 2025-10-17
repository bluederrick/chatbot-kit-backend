import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();
const { MONGO_URI } = process.env;

console.log("MONGO_URI:", MONGO_URI);

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
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }
}

export { Database, client };
