"use strict";
const  AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();
const {response} = require("../utils/helpers")

module.exports.getBrands = async (event,context) => {
    const params = {
        TableName: process.env.BRANDS_TABLE,
        Select: "ALL_ATTRIBUTES"
    };
    try {
        let data = await docClient.scan(params).promise()
        return response(200,data.Items)
    }
    catch (err) {
        return response(409,err.message)
    }

};