const { postTweet } = require('./handler/handler')
const handleFileUpload = require('./handler/handleUpload')
const tweet = require('./tweet')

const routes = [
    {
        method : 'GET',
        path : '/',
        handler : (req,h)=>{
            return "Return All Good"
        }
    },
    {
        method : 'POST',
        path : '/dropfood',
        options : {
            payload : {
                parse : true,
                output : 'stream',
                maxBytes : 1048576 * 3,
                multipart : true
            },
            handler : async (req,h)=>{
                const { payload } = req
                const response = handleFileUpload(payload.file)
                tweet(payload,h)
                return "Success Pushing the image and tweet"
            },
        }
    },
    {
        method : 'GET',
        path : '/dropfood/{param}',
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
]

module.exports = routes