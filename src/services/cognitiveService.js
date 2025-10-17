import dotenv from "dotenv";
import { CohereClientV2 } from 'cohere-ai';
dotenv.config();
import cohere from "cohere-ai";
import { handleApiError } from '../utils/metaHandler.js';

const{COHERE_API_KEY,COGNITIVE_TOKEN}= process.env
console.log( "env : " ,COHERE_API_KEY)
const cohereClient = new CohereClientV2({
  token:COGNITIVE_TOKEN,
});
 class cohereService {
   constructor(client=cohereClient) {
    this.client = client;
  }
   chat(message) {
    console.log("message",message)
    try {
      const response =  this.client.chat({
        model: "command-a-03-2025",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

      return response; 
    } catch (error) {
throw error
// return handleApiError(error )
    }
  }
}

export {cohereService}