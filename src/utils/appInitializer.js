import express from 'express';
import cors from 'cors'


export class AppWrapper {
    // the constructor will be called once the class is instantiated 
constructor(useCors = false, useJson = false, useUrlencoded = false) {
    this.app = express();
    if (useCors) this.app.use(cors());
    if (useJson) this.app.use(express.json());
    if (useUrlencoded) this.app.use(express.urlencoded({ extended: true }));
  }

  getApp() {
    return this.app;
  }
}