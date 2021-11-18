"use strict";
const querystring = require('querystring');
const  AWS = require("aws-sdk");
const uuid = require('uuid');
AWS.config.setPromisesDependency(require('bluebird'));
const docClient = new AWS.DynamoDB.DocumentClient();
const CAR_TABLE = "Carsnor"
const MODELS_TABLE = "Modelsnor"
const BRANDS_TABLE = "Brandsnor"



module.exports.hello = async (event,context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
};

module.exports.addCar = async (event,context) => {
    let { brand, yearval, model,regnum, login } = event
    let response;
    const params = {
        TableName: CAR_TABLE,
        Item: {
            login,
            car_id:uuid.v1(),
            brand,
            yearval,
            model,
            regnum
        }
    };
    try {
        await docClient.put(params).promise()
        response =  {
            statusCode: 200,
            body: "compleated!",
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};

module.exports.updateCar = async (event,context) => {
    let { brand, yearval, model,regnum, login, id } = event
    let response;
    let updVals = {brand, yearval, model,regnum}
    let map = {
        model:":m",
        brand:":b",
        regnum:":r",
        yearval:":y"
    }
    let UpdateExpression  = "set "
    let ExpressionAttributeValues = {}
    for(let key in map){
        if(updVals[key]!==undefined){
            UpdateExpression=UpdateExpression + `${key} = ${map[key]}, `
            ExpressionAttributeValues[map[key]]=updVals[key]
        }
    }
    UpdateExpression=UpdateExpression.substring(0,UpdateExpression.length-2)
    const params = {
        TableName: CAR_TABLE,
        Key: {
            login,
            car_id:id

        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues:"UPDATED_NEW"
    };
    console.log("myObj:",params)
    try {
        await docClient.update(params).promise()
        response =  {
            statusCode: 200,
            body: "compleated!",
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};

module.exports.getCarById = async (event,context) => {
    let { login, id } = event
    let response;
    const params = {
        TableName: CAR_TABLE,
        Key: {
            login,
            car_id:id

        }
    };
    try {
        let data = await docClient.get(params).promise()
        response =  {
            statusCode: 200,
            body: "compleated!"+ JSON.stringify(data.Item, null, 2),
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};

module.exports.getUserCars = async (event,context) => {
    let { login } = event
    let response;
    const params = {
        TableName: CAR_TABLE,
        KeyConditionExpression : 'login = :hkey',
        ExpressionAttributeValues : {
            ':hkey' : login
        }
    };
    try {
        let data = await docClient.query(params).promise()
        response =  {
            statusCode: 200,
            body: "GetItem succeeded: "+ JSON.stringify(data.Items, null, 2),
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};


module.exports.getModelsByBrand = async (event,context) => {
    let { brand } = event
    let response;
    const params = {
        TableName: MODELS_TABLE,
        KeyConditionExpression : 'brand = :hkey',
        ExpressionAttributeValues : {
            ':hkey' : brand
        }
    };
    try {
        let data = await docClient.query(params).promise()
        response =  {
            statusCode: 200,
            body: "GetItem succeeded: "+ JSON.stringify(data.Items, null, 2),
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};

module.exports.getBrands = async (event,context) => {
    let response;
    const params = {
        TableName: BRANDS_TABLE,
        Select: "ALL_ATTRIBUTES"
    };
    try {
        let data = await docClient.scan(params).promise()
        response =  {
            statusCode: 200,
            body: "GetItem succeeded: "+ JSON.stringify(data.Items, null, 2),
        };
    }
    catch (err) {
        response =  {
            statusCode: 409,
            body: err.message,
        };
    }
    return response

};