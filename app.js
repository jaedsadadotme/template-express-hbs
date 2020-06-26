const server = require('./lib/server')

server.initApp()
server.initMiddleware()
server.initTemplateEngine()
server.initRoute()

server.serve()