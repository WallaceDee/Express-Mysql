var mysql = require('mysql');
var dbConfig = {
    host: '39.105.135.155',
    user: 'root',
    password: '447363121',
    database: 'x',
    port: 3306
}
var pool = mysql.createPool(dbConfig);
module.exports = {
    executeSql: function(sql, param, callback) {
        pool.getConnection(function(err, connection) {
            connection.query(sql, param, function(err, result) {
                callback(err, result);
            });
            pool.releaseConnection(connection);
        });
    }
};