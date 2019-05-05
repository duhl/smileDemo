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
    try {
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model("Goods");
        const result = await Goods.findOne({
            ID: goodsId
        }).exec();
        ctx.body = {
            code: 0,
            data: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

// 获取商品大分类的接口
router.get('/getCategoryList', async(ctx) => {
    try {
        const Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {
            code: 0,
            data: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

// 获取商品小分类的接口
router.get('/getCategorySubList', async(ctx) => {
    try {
        let categoryId = 1;
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({
            MALL_CATEGORY_ID: categoryId
        }).exec();
        ctx.body = {
            code: 0,
            data: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})

// 根据商品类别获取商品列表
router.get('/getGoodsListByCategorySubId', async(ctx) => {
    try {
        let categoryId = "2c9f6c946016ea9b016016f79c8e0000";
        const Goods = mongoose.model('Goods');
        let result = await Goods.find({
            SUB_ID: categoryId
        }).exec();
        ctx.body = {
            code: 0,
            data: result
        }
    } catch (err) {
        ctx.body = {
            code: 500,
            message: err
        }
    }
})


module.exports = router