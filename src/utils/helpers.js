"use strict";
module.exports.response = function(statusCode,body){
    return {
        statusCode,
        body
    }
}
module.exports.updateExpressionGenerator = function(map,{...updVals}){
    let UpdateExpression  = "set "
    let ExpressionAttributeValues = {}
    for(let key in map){
        if(updVals[key]!==undefined){
            UpdateExpression=UpdateExpression + `${key} = ${map[key]}, `
            ExpressionAttributeValues[map[key]]=updVals[key]
        }
    }
    UpdateExpression=UpdateExpression.substring(0,UpdateExpression.length-2)
    return {UpdateExpression,ExpressionAttributeValues}
}