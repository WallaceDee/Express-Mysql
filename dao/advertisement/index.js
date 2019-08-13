const {
    print,
    query
} = require('../../lib/util')
const $sql = require('./sqlMapping')

module.exports = {
    list: (req, res) => {
        query($sql.list).then(result => {
            print.success(res, result)
        }).catch(error => {
            print.error(res, result)
        })
    }
}