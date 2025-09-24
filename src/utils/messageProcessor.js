// utils/messageProcessor.js
const processMessage = async ({ cohereService, logger, validatedPayload }) => {
  try {
    console.log("hi",validatedPayload)
    const { message, userId } = validatedPayload.data;
    // console.log("HI" ,message)
    const response = await cohereService.chat(message);

    logger.info(`AI response generated for user ${userId || "anonymous"}`);

    return {
      reply: response?.message || response,
      userId,

    };
  } catch (error) {
    logger.error("Error while processing message", error);
    throw error;
  }
};

export { processMessage };
