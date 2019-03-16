const {ApolloServer} = require('apollo-server')

const typeDefs=require('./typeDefs')
const resolvers=require('./resolvers')
const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.MONGO_URI)
var localUri = 'mongodb://localhost/karkra-geo-location'
mongoose.connect(localUri,{ useNewUrlParser: true })
.then(()=>console.log('DB connected'))
.catch((err)=>console.error(err))


const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

server.listen().then(({url})=>{
    console.log(`server is listening on ${url}`)
})