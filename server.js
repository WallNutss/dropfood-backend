const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const path = require('path')
const Inert = require('@hapi/inert');

const init = async () =>{
    const server = Hapi.Server({
        port : process.env.PORT || 5000,
        routes : {
            cors : {
                origin : ['*'],
            },
            files : {
                relativeTo: path.join(__dirname, 'upload')
            }
        },
        host : 'localhost'
    })
    await server.register(Inert);
    server.route(routes)
    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()