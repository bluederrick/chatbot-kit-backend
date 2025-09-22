
import crypto from "crypto";

 const generateResponseId = () => {
  return crypto.randomBytes(8).toString("hex"); // 16-char unique ID
};

export {generateResponseId}