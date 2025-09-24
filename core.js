import express from 'express';
import dotenv from "dotenv";
const server = express()
import { middleWareFn } from './app.js';
dotenv.config()
const{PORT}=process.env

middleWareFn(server);


server.listen(PORT || 5000, ()=>{
   console.log(`Server listening on port ${PORT}`)
})
