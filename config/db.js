var mysql = require('mysql');
var dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
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