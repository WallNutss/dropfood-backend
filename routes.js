const handleFileUpload = require('./handler/handleUpload')
const tweet = require('./tweet')
const fs = require('fs')

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
                multipart : true,
                allow : 'multipart/form-data'
            },
            handler : async (req,h)=>{
                //console.log(req)
                const { payload } = req
                const data = JSON.stringify(payload)
                const actdata = JSON.parse(data)

                if(payload.file){
                    console.log("There is a file there!")
                    //const response = handleFileUpload(payload.file)
                }else{
                    console.log("No file has been transfered")
                }
                const {status} = actdata
                const {file} = actdata
                const str = Buffer.from(status._data)
                const location = Buffer.from(file._data)
                console.log(str.toString())
                console.log(location.toString())
                //const res = await tweet(payload,h)
                //console.log(data)
                //console.log(Buffer.isBuffer(data))
                return payload
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