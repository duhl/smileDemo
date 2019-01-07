const koa = require("koa")
const app = new koa();

app.use(async (ctx) => {
  ctx.body = "hello koas"
})

app.listen(3000, () => [
  console.log('[SERVER] is starting for 3000')
])
