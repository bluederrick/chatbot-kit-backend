const respond = (status) => (message) => (res) => (data) =>
  res
    .status(status)
    .send(message ? { status, message, data } : { status, ...data });

const success = (message) => respond(200)(message);

const fail = (status, message) => respond(status)(message);
export {fail ,success,respond}

 const generateResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};
export  {generateResponse}