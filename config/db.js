var mysql = require('mysql');

module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'mydb',
        port: 3306
    },
    connect: function() {
        return mysql.createPool(this.mysql);
    },
    executeSql: function(sql, param, callback) {
        this.connect().getConnection(function(err, connection) {
            connection.query(sql, param, function(err, result) {
                callback(err, result);
                connection.release();
            });
        });
    }
};