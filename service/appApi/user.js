const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get("/", async(ctx) => {
    ctx.body = "这是用户操作首页"
})

router.post("/register", async(ctx) => {
    console.log(ctx.request.body)
    const User = mongoose.model("User")
    let newUser = new User(ctx.request.body)

    await newUser.save().then(res => {
            ctx.body = {
                code: 0,
                message: "注册成功"
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
        // ctx.body = ctx.request.body
})

module.exports = router