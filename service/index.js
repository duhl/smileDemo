const Koa = require("koa")
const app = new Koa();
const {
    connect,
    initSchemas
} = require('./database/init.js')
const mongoose = require("mongoose")

;
(async() => {
    await connect();
    initSchemas();
    const User = mongoose.model("User");
    let oneUser = new User({
        userName: "deon",
        password: "123456"
    });
    oneUser.save().then(() => {
        console.log("插入成功！（：")
    })
})()

app.use(async(ctx) => {
    ctx.body = "hello koas"
})

app.listen(3000, () => {
    console.log('[SERVER] is starting for 3000')
})