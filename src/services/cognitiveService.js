
const{COHERE_API_KEY}= process.env
import { CohereClientV2 } from 'cohere-ai';
import cohere from "cohere-ai";
import { handleApiError } from '../utils/metaHandler.js';
import { LoggerService } from '../utils/loggerService.js';

const cohereClient = new CohereClientV2({
  token:COHERE_API_KEY,
});
// =====================================================
// COHERE.ai SERVICE :
// =====================================================
 class cohereService {
  constructor(cohereClient) {
    this.cohereClient = cohereClient; 
    this.LoggerService = new LoggerService()
  }

  async chat(message) {
    try {
      const response = await this.cohereClient.chat({
        model: "command-a-03-2025",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

      return response; // return the response to the caller
    } catch (error) {
        this.logger.info(`Received message: ${error}`);
      // console.error("Error in CohereService.chat:", error);
return handleApiError(error )
    }
  }
}

export {cohereService}