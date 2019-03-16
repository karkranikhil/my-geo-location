const {ApolloServer} = require('apollo-server')

const typeDefs=require('./typeDefs')
const resolvers=require('./resolvers')
const mongoose = require('mongoose')

const {findOrCreateUser} = require('./controllers/userController')
require('dotenv').config()
console.log(process.env.MONGO_URI)
var localUri = 'mongodb://localhost/karkra-geo-location'
mongoose.connect(localUri,{ useNewUrlParser: true })
.then(()=>console.log('DB connected'))
.catch((err)=>console.error(err))


const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers,
    context:async({req})=>{
        let authToken =null
        let currentUser =null
        try{
            authToken = req.headers.authorization
            if(authToken){
                // find or create user
                currentUser = await findOrCreateUser(authToken)
            }
        } catch(err){
            console.log(`unable to authenticate user with token ${authToken}`)
        }
        return {currentUser}
    }
})

server.listen().then(({url})=>{
    console.log(`server is listening on ${url}`)
})