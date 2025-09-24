// services/RateLimiter.js
class RateLimiter {
  constructor(limit = 100) {
    this.limit = limit;           // max requests allowed
    this.requests = new Map();   
    // map inbuilt method with  .has() .get()
    // What .has(key) does

// .has(key) → checks if the Map contains a value for that key.
// Returns:
// true → if the key exists
// false → if the key doesn’t exist
    // store requests per client
  }
  async checkLimit(clientIP, requestId) {
    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute window

    if (!this.requests.has(clientIP)) {
      this.requests.set(clientIP, []);
    }

    // keep only requests in the current window
    const timestamps = this.requests.get(clientIP).filter(ts => now - ts < windowSize);

    // update with new request
    timestamps.push(now);
    this.requests.set(clientIP, timestamps);

    if (timestamps.length > this.limit) {
      throw new Error(`Rate limit exceeded for ${clientIP}, requestId: ${requestId}`);
    }

    return true; 
  }
}

export {RateLimiter}