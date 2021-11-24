"use strict";
const  AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();
const resonse = require("./helper")

module.exports.getBrands = async (event,context) => {
    const params = {
        TableName: BRANDS_TABLE,
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