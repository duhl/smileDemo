const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get("/", async(ctx) => {
    ctx.body = "这是用户上传接口"
})

router.post("/upload",
    /* {
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        }
    }
} */
    async(ctx) => {
        console.log(ctx);
        console.log(ctx.request.files);
        console.log(ctx.request.body);
        // ctx.body = JSON.stringify(ctx.request.files);
        ctx.body = {
            code: 0,
            message: "上传成功"
        }
        return

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