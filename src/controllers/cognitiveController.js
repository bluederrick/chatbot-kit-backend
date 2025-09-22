import { cohereService } from "../services/cognitiveService.js";
import { IpUtil } from "../utils/extractClientIp.js";
import { LoggerService } from "../utils/loggerService.js";
import { RateLimiter as rateLimiter } from "../utils/rateLimitGuard.js";
import { respond } from "../utils/respond.js";
import { validatorSanitizeRequest } from "../validators/validator.js";

class ChatManager {
 constructor({
        CohereService =new cohereService() ,
        ipUtil = new  IpUtil() ,
         Logger = new LoggerService('ChatManager'),
        ApiGatekeeper = new rateLimiter()
    } = {}) {
        this.CohereService = CohereService ;
        this.Logger = Logger;
        this.ApiGatekeeper = ApiGatekeeper;
        this.ipUtil = ipUtil ;
        // Bind methods to maintain context
        this.handleChatRequest = this.handleChatRequest.bind(this);
        this.respond = this.respond;
    }

    async handleChatRequest(req,res) {

        const startTime = Date.now();
        const requestId = this.requestIdUtil.generateRequestId();
        const clientIP = this.ipUtil.getIp(req);

        try {
            // Rate limiting check
            await this.ApiGatekeeper.checkLimit(clientIP, requestId);

            // Comprehensive request validation
            const validatedPayload = await this.validatorSanitizeRequest(req.body, requestId);
            
            // Process the chat message with advanced features
            const chatResponse = await this.processMessage(validatedPayload, {
                requestId,
                clientIP,
                userAgent: req.headers['user-agent'],
                timestamp: new Date().toISOString()
            });

            // Success metrics collection
            this.metrics.recordSuccess('chat_request', Date.now() - startTime, {
                userId: validatedPayload.userId,
                messageLength: validatedPayload.message.length
            });

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
            return this.handleErrorWithContext(error, res, {
                requestId,
                processingTime: Date.now() - startTime,
                clientIP
            });
        }

}
}

export {ChatManager}