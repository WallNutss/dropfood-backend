const { postTweet } = require('./handler/handler')
const handleFileUpload = require('./handler/handleUpload')
const tweet = require('./tweet')

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
        path : '/upload',
        options : {
            handler : async (req,h)=>{
                const { payload } = req
                const response = handleFileUpload(payload.file)
                tweet(payload,h)
                return "Success Pushing the image and tweet"
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
        method : 'GET',
        path : '/upload/{param}',
        handler : (req,h) =>{
            const { param } = req.params;
            return h.file(`${param}`)
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