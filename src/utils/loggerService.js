// =====================================================
// LOGGER SERVICE
// =====================================================
 class LoggerService {
  constructor(context = "App") {
    this.context = context; 
  }

  info(message, ...args) {
    console.log(`[INFO] [${this.context}] ${message}`, ...args);
  }

  warn(message, ...args) {
    console.warn(`[WARN] [${this.context}] ${message}`, ...args);
  }

  error(message, ...args) {
    console.error(`[ERROR] [${this.context}] ${message}`, ...args);
  }

  debug(message, ...args) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] [${this.context}] ${message}`, ...args);
    }
  }
}

export {LoggerService}