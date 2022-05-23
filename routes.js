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
                maxBytes : 1048576 * 10,
                multipart : true
            },
            handler : async (req,h)=>{
                const { payload } = req
                if(payload.file){
                    console.log("There is a file there!")
                    //const response = handleFileUpload(payload.file)
                }else{
                    console.log("No file has been transfered")
                }
                const res = await tweet(payload,h)
                //console.log(data)
                //console.log(Buffer.isBuffer(data))
                return res
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