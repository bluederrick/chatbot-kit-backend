
import  { MongoClient, ServerApiVersion }from 'mongodb';
const { MONGO_URI } = process.env
console.log(MONGO_URI)
 
const client = new MongoClient(MONGO_URI, {
  maxPoolSize: 150,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    // deprecationErrors: true,
  }
});

class Database {
  constructor(uri =MONGO_URI) {
    this.uri = uri;
  }
   connect() {
    try {
       client.connect();
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error(" MongoDB connection failed:", error.message);
       process.exit(1); // stop the app if db connection fails
    }
  }
}

export { Database,client };
