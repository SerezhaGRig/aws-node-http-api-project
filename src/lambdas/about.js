"use strict";
const resonse = require("./helper")

module.exports.hello = async (event,context) => {
    return resonse(200, event)
};