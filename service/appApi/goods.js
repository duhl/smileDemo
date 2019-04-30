const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const { resolve } = require("path")

let router = new Router()

// 导入全部商品信息数据
router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model("Goods")
        data.map((value, index) => {
            // console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(() => {
                saveCount++
                console.log('成功', saveCount)
            }).catch(err => {
                console.log(err)
            })
        })
    })
    ctx.body = "全部商品信息数据，开始导入"
})

// 导入全部商品分类数据
router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newCategory = new Category(value)
            newCategory.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })

    })
    ctx.body = "全部商品分类数据，开始导入....."
})

// 导入全部商品子分类
router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value, index) => {
            // console.log(value)
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then(() => {
                saveCount++
                console.log('插入成功:' + saveCount)
            }).catch(error => {
                console.log('插入失败:' + error)
            })
        })
    })
    ctx.body = "全部商品子分类，开始导入....."
})

// 获取商品详情的接口
router.post('/getDetailGoodsInfo', async(ctx) => {
    let goodsId = ctx.request.body.goodsId;
    const Goods = mongoose.model("Goods");
    await Goods.findOne({
        ID: goodsId
    }).exec().then(async(res) => {
        ctx.body = {
            code: 0,
            data: res
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 500,
            message: err
        }
    })

})



module.exports = router