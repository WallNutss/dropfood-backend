const { TwitterApi, EUploadMimeType } = require('twitter-api-v2')
const dotenv = require('dotenv')
const moment = require('moment')
const path = require('path')

dotenv.config({path:'./.env'})

// OAuth 1.0a (User context)
const client = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

const latency = (dateNow,dateBefore) =>{
    console.log(`Need ${dateNow-dateBefore} ms long to push the tweet`)
}

//Tweet a tweet status with an image
const tweet = async (req,h) => {
    if (req.file){
        const file = req.file
        const data = file._data
        const status = req.status
        //const filename = req.file.hapi.filename
        //const filePath = path.join(__dirname,"upload",filename)
        try { //Buffer
            console.log("Hey")
            const mediaId = await rwClient.v1.uploadMedia(Buffer.from(data), { mimeType: EUploadMimeType.Jpeg});
            console.log(mediaId)
            let dateBefore = Date.now();
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            await rwClient.v1.tweet(`Now, from Node.js at ${date}, ${status}`,{
                media_ids : mediaId,
            })
            latency(Date.now(),dateBefore)
            const response = h.response({
                stasus : "Success",
                message : "Success pushing the tweet to twitter"
            })
            return response
        } catch (error) {
            console.log("Error handling the tweet")
            const response = h.response({
                stasus : "Fail",
                message : error
            })
            return response
        }
    }else{
        const status = req.status
        try {
            let dateBefore = Date.now();
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            await rwClient.v1.tweet(`At ${date}, ${status}`)
            console.log("Successs")
            latency(Date.now(),dateBefore)
            const response = h.response({
                stasus : "Success",
                message : "Success pushing the tweet to twitter"
            })
            return response
        } catch (error) {
            console.log("Error handling the tweet")
            const response = h.response({
                stasus : "Fail",
                message : error
            })
            return response
        }
    }
}

module.exports = tweet