// Library
const { TwitterApi, EUploadMimeType } = require('twitter-api-v2')
const dotenv = require('dotenv')
const moment = require('moment')
const path = require('path')
const uploadImages = require('./handler/handlefirebase')

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
const tweetPOST = async (req,h) => {
    if (req.file){ // If there is an image send
        const {file, status} = req

        const str = Buffer.from(status._data).toString()
        const image = Buffer.from(file._data)

        try { //Sending data
            const mediaId = await rwClient.v1.uploadMedia(Buffer.from(image), { mimeType: EUploadMimeType.Jpeg});
            let dateBefore = Date.now();
            let date = moment().format('LLLL')
            await rwClient.v1.tweet(`Mahasiswa dan teman-teman, segera dapatkan ${str}!. Ini ditangkap pada waktu ${date}`,{
                media_ids : mediaId,
            })
            //uploadImages(image)
            latency(Date.now(),dateBefore)
            const response = h.response({
                stasus : "Success",
                message : "Success pushing the tweet to twitter"
            })
            return response
        } catch (error) { // Error
            console.log("Error handling the tweet")
            console.log("Error again")
            const response = h.response({
                stasus : "Fail",
                message : error
            })
            return response
        }
    }else{
        const {status} = req
        const str = Buffer.from(status._data).toString()
        try {
            let dateBefore = Date.now();
            let date = moment().format('LLLL')
            await rwClient.v1.tweet(`Mahasiswa dan teman-teman semua, segera dapatkan ${str}. Ini ditangkap pada waktu ${date}`)
            latency(Date.now(),dateBefore)
            const response = h.response({
                stasus : "Success",
                message : "Success pushing the tweet to twitter"
            })
            return response
        } catch (error) {
            const response = h.response({
                stasus : "Fail",
                message : error
            })
            return response
        }
    }
}

const tweetGET = async (req,h) =>{
    try {
        const twee = await rwClient.v1.tweet('1530239185965109249') 
        console.log(twee)
        const response = h.response({
            stasus : "Success",
            message : "Get Tweeter"
        })
        return response
    } catch (error) {
        const response = h.response({
            stasus : "Fail",
            message : error
        })
        return response
    }
}
module.exports = {tweetPOST, tweetGET}