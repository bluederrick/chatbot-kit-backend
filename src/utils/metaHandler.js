
export  const handleApiError =(error, context = "API Error")=> {
  // You can extend this later for better logging, alerting, etc.
  const message =
    error?.response?.data?.message || error.message || "Unknown error occurred";

  console.error(`[${context}]`, message);

  // Return a consistent error object
  return {
    success: false,
    context,
    message,
    timestamp: new Date().toISOString(),
  };
}
