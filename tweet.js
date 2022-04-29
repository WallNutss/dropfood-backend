const {TwitterApi} = require('twitter-api-v2')
const dotenv = require('dotenv')
const moment = require('moment')
const path = require('path')

dotenv.config({path:'./config.env'})

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
        const status = req.status
        const filename = req.file.hapi.filename
        const filePath = path.join(__dirname,"upload",filename)
        try {
            const mediaId = await rwClient.v1.uploadMedia(filePath);
            let dateBefore = Date.now();
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            await rwClient.v1.tweet(`Now, from Node.js at ${date}, ${status}`,{
                media_ids:mediaId,
            })
            console.log("Success pushing the tweet!")
            latency(Date.now(),dateBefore)
        } catch (error) {
            console.log("Error handling the tweet")
            console.log(error)
        }
    }else{
        const status = req.status
        try {
            let dateBefore = Date.now();
            let date = moment().format('MMMM Do YYYY, h:mm:ss a')
            await rwClient.v1.tweet(`at ${date}, ${status}`)
            console.log("Successs")
            latency(Date.now(),dateBefore)
        } catch (error) {
            console.log("Error handling the tweet")
            console.log(error)
        }
    }
}

module.exports = tweet