"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello world!"
      },
      null,
      2
    ),
  };
};

module.exports.else = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
        {
          message: "Hello else world!"
        },
        null,
        2
    ),
  };
};
