/**
 * Created by fujunou on 2015/3/6.
 */
const mysql = require("mysql");
const jwt = require("jsonwebtoken"); //用来创建和确认用户信息摘要
const fs = require("fs");
const cert = fs.readFileSync("config/public.key"); // get private key
const dbConfig = require("../config/db.js"); // get private key
const pool = mysql.createPool(dbConfig);


module.exports = {
  executeSql: (sqlSrting, param = []) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          connection.query(sqlSrting, param, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
        pool.releaseConnection(connection);
      });
    });
  },
  // executeSql: function(sql, param, callback) {
  //   pool.getConnection(function(error, connection) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       connection.query(sql, param, function(err, result) {
  //         callback(err, result);
  //       });
  //     }
  //     pool.releaseConnection(connection);
  //   });
  // },
  ensureAuthorized: function (req, res, next) {
    //检查post的信息或者url查询参数或者头信息
    var access_token = req.headers["access_token"] || req.body["access_token"];
    // 解析 token
    if (access_token) {
      // 确认token
      jwt.verify(access_token, cert, {
        algorithms: ["RS256"]
      }, function (
        err,
        decoded
      ) {
        console.log(err);
        if (err) {
          return res
            .status(403)
            .send({
              status: 0,
              result: {
                message: "invalid token."
              }
            });
        } else {
          // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
          req.userInfo = decoded;
          // console.dir(req.userInfo);
          next();
        }
      });
    } else {
      // 如果没有token，则返回错误
      return res.status(403).send({
        status: 0,
        result: {
          message: "没有提供token！"
        }
      });
    }
  },
  setPageAndSize(page,rows){
    return [rows * 1 * (page - 1),rows * 1]
  },
  extend: function (target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key))
        flag ?
        (target[key] = source[key]) :
        target[key] === void 0 && (target[key] = source[key]);
    }
    return target;
  },
  print: {
    success: (res, jsonData) => {
      res.json({
        status: 1,
        result: jsonData
      });
    },
    error: (res, jsonData) => {
      res.json({
        status: 0,
        result: jsonData
      });
    }
  },
  generateTreeData: (array, key = ['parentId', 'id'], eachFuntion, sortFunction) => {
    let tree = array.filter((father) => { //循环所有项
      let branchArray = array.filter((child) => {
        if (eachFuntion) {
          eachFuntion(child)
        }
        return father[key[1]] === child[key[0]] //返回每一项的子级数组
      });
      if (branchArray.length > 0) {
        father.children = sortFunction ? branchArray : branchArray.sort(sortFunction); //如果存在子级，则给父级添加一个children属性，并赋值
        console.log( branchArray , branchArray.sort(sortFunction))
      }
      return father[key[0]] === 0; //返回第一层
    });
    console.log(tree)
    return tree //返回树形数据
  }
};