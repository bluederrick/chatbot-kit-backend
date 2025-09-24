import { cohereService } from "../services/cognitiveService.js";
import { IpUtil } from "../utils/extractClientIp.js";
import { generateResponseId } from "../utils/generateId.js";
import { handleErrorWithContext } from "../utils/handleError.js";
import { LoggerService } from "../utils/loggerService.js";
import { processMessage } from "../utils/messageProcessor.js";
import { RateLimiter as rateLimiter } from "../utils/rateLimitGuard.js";
import { respond, respond as Respond } from "../utils/respond.js";
import { validatorSanitizeRequest } from "../validators/validator.js";

class ChatManager {
 constructor({
        CohereService =new cohereService() ,
        ipUtil = new  IpUtil() ,
         Logger = new LoggerService('ChatManager'),
        ApiGatekeeper = new rateLimiter(),
        Validator = validatorSanitizeRequest,
        ProcessMessage = processMessage,
        
        
    } = {}) {
        this.CohereService = CohereService ;
        this.Logger = Logger;
        this.ApiGatekeeper = ApiGatekeeper;
        this.ipUtil = ipUtil ;
        // Bind methods to maintain context
        this.handleChatRequest = this.handleChatRequest.bind(this);
        this.generateResponseId=generateResponseId ;
        this.respond = Respond;
        this.success = (message) => respond(200)(message);
         this.handleErrorWithContext = handleErrorWithContext(this.Logger);
         this.validatorSanitizeRequest = Validator;
         this.processMessage = ProcessMessage;
    }

    async handleChatRequest(req,res) {

        const startTime = new Date().toISOString();
        console.log("startTime:", startTime);
        const requestId = this.generateResponseId();
        // console.log("requestId", requestId )
        const clientIP = this.ipUtil.getIp(req);
    //  console.log(clientIP)
        try {
            // Rate limiting check
            await this.ApiGatekeeper.checkLimit(clientIP, requestId);

            // Comprehensive request validation
            const validatedPayload =  this.validatorSanitizeRequest(req.body, requestId);

            // const chatResponse = processMessage(validatedPayload, {
            //     requestId,
            //     clientIP,
            //     userAgent: req.headers['user-agent'],
            //     timestamp: new Date().toISOString()
            // });

            const chatResponse = await processMessage({
           cohereService: this.CohereService ,
           logger: this.Logger,   // 👈 passing the logger instance here
           validatedPayload,
        //    meta,
      });

      console.log(chatResponse)

            // Success metrics collection
            // this.metrics.recordSuccess('chat_request', Date.now() - startTime, {
            //     userId: validatedPayload.userId,
            //     messageLength: validatedPayload.message.length
            // });

            // Structured success response
            return respond(200)("Chat response generated successfully")(res)({
                ...chatResponse,
                metadata: {
                    requestId,
                    processingTime: Date.now() - startTime,
                    timestamp: new Date().toISOString(),
                    version: '2.0.0'
                }
            });
            } catch (error) {
                console.log(error)
            return this.handleErrorWithContext(error, res, {
                requestId,
                processingTime: Date.now() - startTime,
                clientIP
            });
        }

}
}

export {ChatManager}