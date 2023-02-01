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
        }
    })
    // Middleware
    await server.register(Inert);
    //Routes
    server.route(routes)
    //Start server
    await server.start()
    console.log(`Server running at ${server.info.uri}`)
}

init()