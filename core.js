import express from 'express';
import { Database } from './src/config/database.js';
import { middleWareFn } from './app.js'; 
import dotenv from "dotenv";
import logger from './src/utils/Loggers.js';
dotenv.config()
const server = express()
const db = new Database();
db.connect();
const{PORT}=process.env

middleWareFn(server);

server.listen(PORT || 5000, ()=>{
   logger.info(`Server listening on port ${PORT}`)
})
