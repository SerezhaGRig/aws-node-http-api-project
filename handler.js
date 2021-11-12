"use strict";
const querystring = require('querystring');
module.exports.hello = async (event,context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello world!",
      },
      null,
      2
    ),
  };
};

module.exports.else = async (event,context) => {
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
module.exports.addCar = async (event,context) => {
    let eventBody = JSON.parse(event.body)
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Hello else world!",
                eventBody
            },
            null,
            2
        ),
    };
};