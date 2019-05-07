var Busboy = require('busboy');
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');
var snowflake = require('node-snowflake').Snowflake;
let FdfsClient = require('fdfs');

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

var getFdfs = function(fdfs) {

    return new FdfsClient({
        // tracker servers
        trackers: [{
            host: fdfs.upload.host,
            port: fdfs.upload.port
        }],
        // 默认超时时间10s
        timeout: fdfs.timeout || 10000,

        // 默认后缀
        // 当获取不到文件后缀时使用
        defaultExt: fdfs.defaultExt || 'png',
        // charset默认utf8
        charset: fdfs.charset || 'utf8'
    });
};

var ueditor = function(static_url, config = {}, handel) {
    return function(req, res, next) {
        var _respond = respond(static_url, config, handel);
        _respond(req, res, next);
    };
};
var respond = function(static_url, config = {}, callback) {
    if (typeof config === 'function') {
        callback = config
        config = {}
    }
    return function(req, res, next) {
        if (req.query.action === 'config') {
            callback(req, res, next);
            return;
        } else if (req.query.action === 'listimage' || req.query.action === 'listfile') {
            res.ue_list = function(list_dir) {
                var str = '';
                var i = 0;
                var list = [];
                fs.readdir(static_url + list_dir, function(err, files) {
                    if (err) throw err;

                    var total = files.length;
                    files.forEach(function(file) {

                        var filetype = 'jpg,png,gif,ico,bmp';
                        var tmplist = file.split('.');
                        var _filetype = tmplist[tmplist.length - 1];
                        var temp = {};
                        if (list_dir === '/') {
                            temp.url = list_dir + file;
                        } else {
                            temp.url = list_dir + "/" + file;
                        }
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
            };
            //如果配置了fdfs则从fdfs.list列表读取图片url
            if (config.fdfs) {
                res.ue_list = function(list_dir) {
                    fs.readFile(static_url + list_dir + 'fdfs.list', function(err, data) {
                        var list = [];
                        if (data) {
                            var dataList = data.toString().split('\n');
                            dataList.forEach(function(item) {
                                if (item) list.push(JSON.parse(item))
                            })
                        }
                        res.json({
                            "state": 'SUCCESS',
                            "list": list,
                            "start": 1,
                            "total": list.length
                        })
                    })
                }
            }
            callback(req, res, next);

        } else if (req.query.action === 'uploadimage' || req.query.action === 'uploadfile' || req.query.action === 'uploadvideo') {
            var busboy = new Busboy({
                headers: req.headers
            });
            busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
                req.ueditor = {};
                req.ueditor.fieldname = fieldname;
                req.ueditor.file = file;
                req.ueditor.filename = filename;
                req.ueditor.encoding = encoding;
                req.ueditor.mimetype = mimetype;
                res.ue_up = function(img_url) {
                    var tmpdir = path.join(os.tmpdir(), path.basename(filename));
                    var name = snowflake.nextId() + path.extname(tmpdir);
                    var dest = path.join(static_url, img_url, name);
                    var writeStream = fs.createWriteStream(tmpdir);
                    file.pipe(writeStream);
                    writeStream.on("close", function() {
                        fse.move(tmpdir, dest, function(err) {
                            if (err) throw err;
                            res.json({
                                'url': path.join(img_url, name).replace(/\\/g, '/'),
                                'title': req.body.pictitle,
                                'original': filename,
                                'state': 'SUCCESS'
                            });
                        });
                    })
                };
                callback(req, res, next);
            });
            req.pipe(busboy);
        } else {
            callback(req, res, next);
        }
        return;
    };
};
module.exports = ueditor;