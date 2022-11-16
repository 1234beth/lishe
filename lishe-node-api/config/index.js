const knex = require('./knex.js');
const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const isBoolean = require('lodash/isBoolean');
const keys = require('lodash/keys');



module.exports={
    create: async (tableName, data) => {
    let result = await knex(tableName).insert(data).returning('*');
    return result[0];
},
search: async (tableName, whereParams, columns = '*', orderParam, orderBy) => {
    if (orderBy === undefined) {
        let result = await knex.select(columns)
            .from(tableName)
            .where(whereParams);
        if (result.length === 1) result = result[0];
        return result;
    } else {
        let result = await knex.select(columns)
            .from(tableName)
            .where(whereParams)
            .orderBy(orderParam, orderBy);
        return result;
    }
},
}



 
