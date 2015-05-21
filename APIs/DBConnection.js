var sql = require('mssql');
var DBConfig = require('./DBConfig.js');

var DBConecction = function(config){
    this.config = config;
    this.connection = new sql.Connection(this.config, function (err) {
        // ... error checks
        // Query
    });
};

/**
 * @private
 * @param {string} type
 */
DBConecction.prototype.defineSqlType = function(type){
    var sqlType;
    switch(type){
        case 'string':
            sqlType = sql.VarChar;
        case 'number':
            sqlType = sql.Int;
        case 'date':
            sqlType = sql.Date;
        case 'double':
            sqlType = sql.Double;
        default:
            sqlType = sql.VarChar;
    }
    return sqlType;
};

DBConecction.prototype.getConnection = function(){
  return this.connection;
};

/**
 *
 * @param query
 * @param {Array.<DBPreparedParams>} params
 */
DBConecction.prototype.prepare = function(query, params, callback){
    var ps = new sql.PreparedStatement(this.connection);
    var self = this;


    var paramsQuery = {};
    if(!!params){
        params.forEach(function(param){
            ps.input(param.name, self.defineSqlType(param.type));
            paramsQuery[param.name] = param.value;
        });
    }


    ps.prepare( query , function(err) {
        // ... error checks
        ps.execute(paramsQuery, function(err, recordset) {
            // ... error check
            ps.unprepare(function(err) {
                // ... error checks
            });
            //console.log(recordset);
            callback(recordset);

        });
    });
}


module.exports = (new DBConecction(DBConfig));
