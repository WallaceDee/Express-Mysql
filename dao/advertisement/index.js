const {
    print,
    executeSql
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        executeSql($sql.list).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, result)
        })
    }
}