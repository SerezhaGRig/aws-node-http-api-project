"use strict";
const resonse = require("../utils/helpers")

module.exports.hello = async (event,context) => {
    return resonse(200, event)
};