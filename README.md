# Express-Mysql 简单实例开发

## 1.配置数据库连接信息

```javascript
//此项目 sql 文件是根目录下的 x.sql
//根目录/config/db.js 
module.exports = {
    host: "39.105.135.155",//localhost数据库ip
    user: "root",//数据库用户名
    password: "123456",//数据库密码
    database: "x",//数据库名
    port: 3306,//端口号，默认3306
    multipleStatements: true//开启多行语句查询，项目中有用到
  }
```

## 2.运行

```javascript
//推荐使用淘宝镜像安装
cnpm install

//使用了nodemon，热更新，开发用
npm start

//运行项目
npm run serve
```

## 3.编写第一个接口

### （1）编写Dao层

以模块作为划分，用模块名字新建文件夹，下面以advertisement模块作为例子

```javascript
//目录
...dao//Dao层
   ...advertisement//模块
      ...index.js//接口逻辑
      ...sqlMappind.js//mysql语句
   ...
...
```

```javascript
//根目录/dao/sqlMapping.js
module.exports = {
  list: 'SELECT * FROM table_advertisement'
}
```

```javascript
//根目录/dao/index.js
const {
    print,//输出json
    query//执行sql
} = require('../../lib/util')//引入自定义的方法
const $sql = require('./sqlMapping')//引入同目录下对应的上去了Maping.js

module.exports = {
    list: (req, res) => {
      /**
      * 查询sql
      * @param sqlSrting sql语句
      * @param param sql语句中的参数，与{{}}匹配，Sample：'SELECT * FORM table WHERE id={{myId}}'，传入{myId:1}，具体查看/lib/util.js的query方法
      */
        query($sql.list).then(result => {
            print.success(res, result)//打印出json结果
        /**
        * //print.success同一下方法
        *res.json({
              *status: 1,
              *result
              *})
        */
        }).catch(error => {
            print.error(res, result)//打印出json结果
          /**
          * //print.success同一下方法
          *res.json({
                *status: 0,
                *result
                *})
          */
        })
    }
}
```

### （2）把方法挂载到路由上

```javascript
//根目录/routes/api/advertisement.js
const express = require("express")
const router = express.Router()
const adDao = require("../../dao/advertisement/index")
//get请求或者post请求
router.get("/list", adDao.list)
module.exports = router
```

```javascript
//根目录/app.js
...
const advertisement = require('./routes/api/advertisement')
...
app.use('/api/advertisement', advertisement)
```

最后访问 http://localhost/api/advertisement/list 就可以看到接口数据了

## 4.关键方法实现

### sql查询方法

```javascript
/**
 * 查询sql
 * @param sqlSrting sql语句
 * @param param sql语句中的参数，与{{}}匹配，Sample：'SELECT * FORM table WHERE id={{myId}}'，传入{myId:1}
 */
  query: (sqlSrting, param={}) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((connectionError, connection) => {
        if (connectionError) {
          reject(connectionError)
        } else {
          //set customer queryFormatter
          connection.config.queryFormat = function (query, values) {
            if (!values) return query
            return query.replace(/\{\{(\w+)\}\}/g,(txt, key)=> {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key])
              }
              return txt
            })
          }
          connection.query(sqlSrting, param, (queryError, result) => {
            if (queryError) {
              reject(queryError)
            } else {
              resolve(result)
            }
          })
        }
        pool.releaseConnection(connection)
      })
    })
  },
```

### token机制

项目中使用了`jsonwebtoken`和`RS256`加密生成和验证token

```javascript
//根目录/api/blog.js
//使用了util.js下的ensureAuthorized方法
router.post('/publicBlog', util.ensureAuthorized, blogDao.publicBlog)
```

具体实现：

```javascript
ensureAuthorized: function (req, res, next) {
    //检查post的信息或者url查询参数或者头信息
    const accessToken =req.headers['Authorization']||req.headers['access_token'] || req.body['access_token']
    // 解析 token
    if (accessToken) {
      // 确认token
      jwt.verify(accessToken, cert, {
        algorithms: ['RS256']
      }, function (
        err,
        decoded
      ) {
        if (err) {
          return res
            .status(403)
            .send({
              status: 0,
              result: {
                message: 'Invalid token.'
              }
            })
        } else {
          // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
          req.userInfo = decoded
          // console.dir(req.userInfo)
          next()
        }
      })
    } else {
      // 如果没有token，则返回错误
      return res.status(403).send({
        status: 0,
        result: {
          message: 'No token was provided.'
        }
      })
    }
  },
```

### 更多

`qq`、`weibo`授权登录

`UEditor`接入

...
