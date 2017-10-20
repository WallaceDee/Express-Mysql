var mysql = require('mysql');
module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'h',
        password: '123456',
        database: 'x',
        port: 3306
    },
    connect: function() {
        return mysql.createPool(this.mysql);
    },
    executeSql: function(sql, param, callback, pool) {
        pool.getConnection(function(err, connection) {
            connection.query(sql, param, function(err, result) {
                callback(err, result);
                connection.release();
            });
        });
    }
};