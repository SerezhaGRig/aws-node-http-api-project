"use strict";
const  AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();
const resonse = require("./helper")

module.exports.getModelsByBrand = async (event,context) => {
    let { brand } = event
    const params = {
        TableName: MODELS_TABLE,
        KeyConditionExpression : 'brand = :hkey',
        ExpressionAttributeValues : {
            ':hkey' : brand
        }
    };
    try {
        let data = await docClient.query(params).promise()
        return response(200,data.Items)
    }
    catch (err) {
        return response(409,err.message)
    }

};