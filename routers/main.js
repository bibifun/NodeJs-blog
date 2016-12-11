
var express = require('express');

// 创建路由对象
var router = express.Router();

router.get('/user',function(req,res,next) {
    res.send('main - User');
})

module.exports = router;
