"use strict";
const  AWS = require("aws-sdk");
const uuid = require('uuid');
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();
const {response, updateExpressionGenerator} = require("../utils/helpers")
const logger =require("../utils/logger")

module.exports.addCar = async (event,context) => {

    let bodyData = JSON.parse(event.Records[0].body)
    let { brand, yearval, model,regnum, login } = bodyData
    logger.info(bodyData)
    logger.info(process.env.CARS_TABLE)
    const params = {
        TableName: process.env.CARS_TABLE,
        Item: {
            login,
            carId:uuid.v1(),
            brand,
            yearval,
            model,
            regnum
        }
    };
    await docClient.put(params).promise()
    return ''

};
module.exports.updateCar = async (event,context) => {
    let { brand, yearval, model,regnum, login, id } = event
    let updVals = {brand, yearval, model,regnum}
    let map = {
        model:":m",
        brand:":b",
        regnum:":r",
        yearval:":y"
    }
    let {UpdateExpression, ExpressionAttributeValues} = updateExpressionGenerator(map,{brand, yearval, model,regnum})
    const params = {
        TableName: process.env.CARS_TABLE,
        Key: {
            login,
            carId:id
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues:"UPDATED_NEW"
    };
    try {
        await docClient.update(params).promise()
        return response(200,"compleated!")
    }
    catch (err) {
        return response(409,err.message)
    }

};

module.exports.getCarById = async (event,context) => {
    let { login, id } = event
    const params = {
        TableName: process.env.CARS_TABLE,
        Key: {
            login,
            carId:id

        }
    };
    try {
        let data = await docClient.get(params).promise()
        return  response(200,data.Item)
    }
    catch (err) {
        return response(409,err.message)
    }

};

module.exports.getUserCars = async (event,context) => {
    let { login } = event
    const params = {
        TableName: process.env.CARS_TABLE,
        KeyConditionExpression : 'login = :hkey',
        ExpressionAttributeValues : {
            ':hkey' : login
        }
    };
    try {
        let data = await docClient.query(params).promise()
        return response(200, data.Items)
    }
    catch (err) {
        return response(409,err.message)
    }

};