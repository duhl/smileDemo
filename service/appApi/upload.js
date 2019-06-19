const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get("/", async(ctx) => {
    ctx.body = "这是用户上传接口"
})

router.post("/upload", async(ctx) => {
    const GoodsNew = mongoose.model("GoodsNew")
    let newGoodsNew = new GoodsNew(ctx.request.body)

    await newGoodsNew.save().then(res => {
        ctx.body = {
            code: 0,
            message: "上传成功"
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
})

module.exports = router