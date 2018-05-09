const Koa = require('koa')
const koaBody = require('koa-body')


const makeTestNode = (port, cb) => {
  const app = new Koa()

  app.use(koaBody({
    formLimit: 1024 * 1024 * 1024,
    multipart: true
  }))
  app.use(cb)

  let _server

  _server = app.listen(port)
  
  return () => {
    _server.close()
  }
}


module.exports = makeTestNode