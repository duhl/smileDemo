const Koa = require("koa")
const app = new Koa();
const {
    connect
} = require('./database/init.js')

;
(async() => {
    await connect()
})()

app.use(async(ctx) => {
    ctx.body = "hello koas"
})

app.listen(3000, () => {
    console.log('[SERVER] is starting for 3000')
})