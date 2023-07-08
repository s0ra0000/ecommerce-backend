const server = require('fastify')({ logger: true })
require("dotenv").config()

const startServer = async() =>{
  try{
    server.listen({port: process.env.PORT})
    server.log.info("Server started")
  } catch(err){
    server.log.error(err)
  }
}

startServer();