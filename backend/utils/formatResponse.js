exports.formatResponse = (error, message, data = null) => {
    const response = {
      error: error,
      message: message,
      status: error ? 0 : 1,
    };
    if (data !== null) {
      response.data = data;
    }
    return response;
  };
  