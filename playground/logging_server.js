const logger = require('koa-logger')
const Koa = require('koa')

const app = new Koa()
app.use(logger())

app.use(async ctx => {
  if(Math.random() > 0.5) {
    ctx.status = 500
  } else {
    ctx.body = 'Hello World'
  }
})

app.listen(5001)