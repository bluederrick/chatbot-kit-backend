import express from 'express';
import cors from 'cors';
import { router as chatApi} from './src/routes/chat.js';

export const middleWareFn =(app)=>{
const whiteList = ['http://localhost:5000/api/v1'];

const corsOptions = {
    
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Access Denied'));
    }
  }
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1",chatApi);

return app;
}
