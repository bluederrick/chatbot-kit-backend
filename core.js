import express from 'express';
import dotenv from "dotenv";
const app = express()
import { middleWareFn } from './app.js';
dotenv.config()
const{PORT}=process.env

middleWareFn(app);
// 
app.get('chat', (req,res)=>{
   console.log("hello world")
})
app.listen(PORT || 5000, ()=>{
   console.log(`Server listening on port ${PORT}`)
})
