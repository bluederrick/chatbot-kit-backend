import { CohereClientV2 } from 'cohere-ai';
import cohere from "cohere-ai";
import { handleApiError } from '../utils/metaHandler.js';


const{COHERE_API_KEY}= process.env
console.log( "env : " ,COHERE_API_KEY)
const cohereClient = new CohereClientV2({
  token:"BC9u5o0YSCyVKCCwSOmd7IaSV1VIaR2Qjx1AggOL",
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
console.log(response)
      return response; // return the response to the caller
    } catch (error) {
throw error
// return handleApiError(error )
    }
  }
}

export {cohereService}