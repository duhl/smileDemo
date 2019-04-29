const Koa = require("koa")
const app = new Koa()
const {
    connect,
    initSchemas
} = require('./database/init.js')
const mongoose = require("mongoose")
const bodyParser = require("koa-bodyparser")
const cors = require("koa2-cors")
const Router = require("koa-router")


app.use(bodyParser())
app.use(cors())

let user = require("./appApi/user.js")
let home = require("./appApi/home.js")

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/home', home.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 连接数据库
;
(async() => {
    await connect();
    initSchemas();
    /* const User = mongoose.model("User");
    let oneUser = new User({
        userName: "deon_3",
        password: "123456"
    });
    oneUser.save().then(() => {
        console.log("插入成功！（：")
    });
    let user = await User.findOne({});
    console.log("------------------")
    console.log("- ", user) */
})()

app.use(async(ctx) => {
    ctx.body = "hello koas"
})

app.listen(3000, () => {
    console.log('[SERVER] is starting for 3000')
})