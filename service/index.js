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
        userName: "deon_3",
        password: "123456"
    });
    oneUser.save().then(() => {
        console.log("插入成功！（：")
    });
    let user = await User.findOne({});
    console.log("------------------")
    console.log("- ", user)
})()

app.use(async(ctx) => {
    ctx.body = "hello koas"
})

app.listen(3000, () => {
    console.log('[SERVER] is starting for 3000')
})