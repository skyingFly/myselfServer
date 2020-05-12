const express = require("express")
const app = express()
let Router = require('./routes/router')

// 跨域设置
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
// 取消缓存
app.disable('etag')

app.use(express.static('./resource'));

app.use(Router)

app.listen(3000, () => {
    console.log('Express server listening on port ');
})
