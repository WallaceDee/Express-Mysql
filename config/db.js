var mysql = require('mysql');
var dbConfig = {
    host: '39.105.135.155',
    user: 'root',
    password: '363121',
    database: 'x',
    port: 3306,
    multipleStatements: true
}
var pool = mysql.createPool(dbConfig);
module.exports = {
    executeSql: function(sql, param, callback) {
        pool.getConnection(function(error, connection) {
            if (error) {
                console.log(error)
            } else {
                connection.query(sql, param, function(err, result) {
                    callback(err, result);
                });
            }
            pool.releaseConnection(connection);
        });
    }
};