import express from 'express';
import cors from 'cors';
import { router } from './src/routes/chat.js';

export const middleWareFn =(app)=>{
const whiteList = '*';

const corsOptions = {
    
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Access Denied'));
    }
  }
};
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json(), cors(corsOptions));
}
