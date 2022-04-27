const { postTweet } = require('./handler/handler')
const handleFileUpload = require('./handler/handleUpload')

const routes = [
    {
        method : 'GET',
        path : '/',
        handler : (req,h)=>{
            return "All Good"
        }
    },
    {
        method : 'POST',
        path : '/',
        options : {
            handler : async (req,h)=>{
                console.log("---------------------------")
                const { payload } = req
                //console.log(payload.file)
                const response = handleFileUpload(payload.file)

                return payload
            },
            payload : {
                parse : true,
                output : 'stream',
                maxBytes : 1048576 * 3,
                multipart : true
            }
        }
    },
    {
        method : '*',
        path : '/',
        handler : (req,h) =>{
            return "Halaman tidak dapat diakses dengan method tersebut"
        }
    },
    {
        method : 'GET',
        path : '/api',
        handler : (req,h) =>{
            return "Documentation"
        }
    },
    {
        method : 'POST',
        path : '/api',
        handler : postTweet
    },

]

module.exports = routes