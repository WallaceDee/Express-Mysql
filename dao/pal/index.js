// dao/userDao.js
// 实现与MySQL交互
let $db = require('../../config/db');
let $util = require('../../util/util');
let $sql = require('./sqlMapping');
const fs = require('fs');
var path = require('path');
var {baseUrl} = require('../../config/config.js');
module.exports = {
    getCategoryList: (req, res) => {
        function descByUpdateTime(val1, val2) {
            return val2.updateTime - val1.updateTime;
        }

        function setTreeData(data) {
            let tree = data.filter((father) => { //循环所有项
                let branchArr = data.filter((child) => {
                    child.updateTime = new Date(child.updateTime).getTime()
                    return father.categoryId === child.parentId //返回每一项的子级数组
                });
                if (branchArr.length > 0) {
                    branchArr.sort(descByUpdateTime)
                    father.children = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
                }
                return father.parentId === 0; //返回第一层
            });
            return tree //返回树形数据
        }
        $db.executeSql($sql.getCategoryList, [], function(err, result) {
            var data = setTreeData(result)
            data.sort(descByUpdateTime)
            $util.print(res, { error: err, result: data })
        });
    },
    getMusicList: (req, res) => {
        var str = '';
        var i = 0;
        var list = [];
        var list_dir = baseUrl+"pal/musics"
        fs.readdir(path.join(__dirname, '../../public/pal/musics/'), function(err, files) {
            if (err) throw err;
            var total = files.length;
            files.forEach(function(file) {
                var filetype = 'jpg,png,gif,ico,bmp';
                var tmplist = file.split('.');
                var _filetype = tmplist[tmplist.length - 1];
                console.log(_filetype)
                var temp = {
                    src: list_dir + "/" + file,
                    pic: '/pal/cover.jpg',
                    filetype: _filetype,
                    title: tmplist[0].split(' - ')[1],
                    artist: tmplist[0].split(' - ')[0]
                };
                list[i] = (temp);
                i++;
                // send file name string when all files was processed
                if (i === total) {
                    res.json({
                        "state": "SUCCESS",
                        "list": list,
                        "start": 1,
                        "total": total
                    });
                }
            });
        });

        // $util.print(res, { error:null, result:{a:1} })
    },
    getItemListByCategoryId: (req, res) => {
        $db.executeSql($sql.getItemListByCategoryId, [req.body.categoryId], (error, result) => {
            $util.print(res, { error, result })
        })
    },
    getCharacterList: (req, res) => {
        $db.executeSql($sql.getCharacterList, [], (error, result) => {
            $util.print(res, { error, result })
        })
    }
}