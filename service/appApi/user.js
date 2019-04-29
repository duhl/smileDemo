const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get("/", async(ctx) => {
    ctx.body = "这是用户操作首页"
})

router.post("/register", async(ctx) => {
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
})

router.post("/login", async(ctx) => {
    // const User = mongoose.model("User")
    let loginUser = ctx.request.body
    console.log(loginUser)
    let userName = loginUser.userName;
    let password = loginUser.password;

    const User = mongoose.model("User")
    await User.findOne({
        userName: userName
    }).exec().then(async(res) => {
        console.log("778", res)
        if (res) {
            let newUser = new User();
            await newUser.comparePassword(password, res.password).then(isMatch => {
                ctx.body = {
                    code: 0,
                    isLogin: isMatch,
                    message: isMatch ? "登录成功" : "密码错误，请重新输入"
                }
            }).catch(err => {
                console.log(err)
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
        } else {
            ctx.body = {
                code: 0,
                isLogin: false,
                message: "用户名不存在"
            }
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 500,
            message: err
        }
    })

    /* await newUser.save().then(res => {
        ctx.body = {
            code: 0,
            message: "注册成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    }) */
})

module.exports = router