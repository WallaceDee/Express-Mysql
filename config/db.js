var mysql = require('mysql');

module.exports = {
    mysql: {
        host: '39.105.135.155',
        user: 'root',
        password: '447363121',
        database: 'x',
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