"use strict";
const {response} = require("../utils/helpers")

module.exports.hello = async (event,context) => {
    return response(200, event)
};