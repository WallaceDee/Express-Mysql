var mysql = require('mysql');
module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'x',
        port: 3306
    },
    connect: function() {
        return mysql.createPool(this.mysql);
    },
    executeSql: function(sql, param, pool, callback) {
        pool.getConnection(function(err, connection) {
            connection.query(sql, param, function(err, result) {
                callback(err, result);
                connection.release();
            });
        });
    }
};