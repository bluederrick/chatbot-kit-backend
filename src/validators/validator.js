
/**
 * Validate and sanitize an incoming request payload
 * @param {object} payload - The raw request body
 * @param {string} requestId - Unique ID for tracing/logging
 * @returns {object} - { success, data, errors }
 */
const  validatorSanitizeRequest = (payload, requestId = null)=> {
  const errors = [];
  const sanitized = {};

  // Example: Required field `message`
  !payload.message || typeof payload.message !== "string"
  ? errors.push("Message is required and must be a string.")
  : (sanitized.message = payload.message.trim());


  //  Example: Optional field `userId`
  if (payload.userId) {
    if (typeof payload.userId !== "string") {
      errors.push("userId must be a string.");
    } else {
      sanitized.userId = payload.userId.trim();
    }
  }

  // ✅ Example: Optional field `conversationId`
  if (payload.conversationId) {
    if (typeof payload.conversationId !== "string") {
      errors.push("conversationId must be a string.");
    } else {
      sanitized.conversationId = payload.conversationId.trim();
    }
  }

  // Optional metadata (object only)
  if (payload.metadata && typeof payload.metadata !== "object") {
    errors.push("metadata must be an object.");
  } else if (payload.metadata) {
    sanitized.metadata = payload.metadata;
  }

  if (errors.length > 0) {
    return {
      success: false,
      requestId,
      errors,
    };
  }

  return {
    success: true,
    requestId,
    data: sanitized,
  };
}

export{validatorSanitizeRequest}