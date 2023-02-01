const handleFileUpload = require('./handler/handleUpload')
const {tweetPOST, tweetGET} = require('./tweet')
const fs = require('fs')

const routes = [
    {
        method : 'GET',
        path : '/',
        handler : (req,h)=>{
            return "Good Response"
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
                const { payload } = req
                // Parsing data, because client mainly from raspberry Pi
                const data = JSON.parse(JSON.stringify(payload))
                if(payload.file){
                    console.log("There is a file there!")
                    //const response = handleFileUpload(payload.file) // Dont needed anymore, cause sending it through buffer
                }else{
                    console.log("No file has been transfered")
                }
                // Tweet the data
                const res = await tweetPOST(data,h)
                return res
            },
        }
    },
    {
        method : 'GET',
        path : '/dropfood',
        handler : async (req,h) =>{
            //const res = await tweetGET(req,h)
            return "Get Twitter"
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