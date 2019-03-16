const {ApolloServer} = require('apollo-server')

const typeDefs=require('./typeDefs')
const resolvers=require('./resolvers')
const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

server.listen().then(({url})=>{
    console.log(`server is listening on ${url}`)
})