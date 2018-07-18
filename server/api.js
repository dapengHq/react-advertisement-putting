
const http = require('http');
const querystring = require('querystring')
const fs = require('fs')
const Mock = require('mockjs')
const jwt = require('jsonwebtoken');
//token验证
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "1601E", function (err, decoded) {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}
// const _ = require('lodash')
// const multer = require('multer')
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         console.log(file)
//         let filename = file.originalname.split('.')
//         cb(null, filename[0] + '-' + Date.now()+'.'+filename[1])
//     }
// })
   
// var upload = multer({ storage: storage })


module.exports = function (app) {
    /* app.engine('html', require('ejs').renderFile);
    app.get('/',(req,res)=>{
        res.send(ejs.render('<ul><%= people.join(", "); %></ul>', {people: people}))
    }) */

    //home graph
    app.post('/dsp-report/index',function(req,res){
        verifyToken(req.headers.token).then(res=>{
            console.log(res)
        })
        let {count} = req.body;
        let Random = Mock.Random;
        let mockData = Mock.mock({
            "status": 0,
            "data": {
                exposeNum: 10000, //曝光量
                clickNum: 1000, // 点击量
                clickRate: 100,  // 点击率
                clickPrice: 10000, // 点击均价
                cpmPrice: 200000, // 千次展示均价
                consumed: 1000, // 时间段消耗(单位分)
                [`dataY1|${count || 5}`]: [() => Random.natural(1, 1500)],
                dataY2:[1100, 1382, 1325, 1600, 1600]
            }
        })
        res.send(mockData)

    })
 //login api
 app.post('/dsp-admin/user/login', function (req, res) {
    
     let user = fs.readFileSync(__dirname + '/user.json', {
         encoding: "utf-8"
     });
     user = JSON.parse(user);
     let login = req.body;
     let resInfo = {
         msg: 'login rejected',
         success: 1
     }
     user.forEach(usr => {
         if (usr.username == login.username && usr.password == login.password) {
             resInfo.success = 0;
             resInfo.msg = "login success";
             resInfo.user = {
                 name: usr.username,
                 time: new Date().toLocaleTimeString()
             }
         }
     });
     
     if (resInfo.success == 0) {
         resInfo.token = jwt.sign(login, "1601E", {
             expiresIn: 60 * 60
         })
     }

     res.end(JSON.stringify(resInfo))

 })
//Table表格数据
 app.post('/dsp-advert/adunits/list',(req,res)=>{
     let Random = Mock.Random;
   let tableData = Mock.mock({
        "list|30":[{
        "key": ()=>Random.increment(0),
        "name":"计划",
        "promotionType": 1, // 推广目的
        "status":1,//计划状态 (1:投放中；2:下线-达到日预算；3:下线-达到账户预算； 4:暂停；999:删除)
        "dayBudget|10000-50000": 1, // 计划日预算(单位分)
        "exposeNum|40000-90000": 1, //曝光量
        "clickNum|10000-50000": 1, //点击量
        "clickRate|10000-50000": 1, //点击率
        "clickPrice|10000-50000": 1, //点击均价；  单位是分 消费/点击量
        "cpmPrice|10000-50000": 1, //千次展示均价；  单位是分 消费/曝光量
        "consumed|10000-50000": 1, //总消耗
        "modifyTime|10000-50000": 1,
        "createTime|10000-50000":1,
        "operatorId":1,//操作人Id
        "operatorName": ()=>Random.cname() //创建人姓名
        }]
    })
    res.send(tableData)
 })

 app.get('/del/list',(req,res)=>{
    console.log(req.query)
    if(req.query.id){
        res.send({
            code:1,
            msg:'您稍删除的商品信息id是          '+req.query.id
        })
    }else{
        res.send({
            code:0,
            msg:'删除失败!'
        })
    }
 })

// //upload 上传接口
// app.post('/dsp-creative/creative/upload',upload.single('file'),function(req,res){
    
//     res.send({
//         "data": {
//                    "size":req.file.size,
//                    "value":req.file.path,
//                    "key":"2A36B67C6"
//             },
//         "status":0
//       }
//     )
// })
}

