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

//Tweet a tweet status with an image
const tweet = async (req,h) => {
    const status = req.status
    const filename = req.file.hapi.filename
    const filePath = path.join(__dirname,"upload",filename)
    console.log(filePath)
    try {
        const mediaId = await rwClient.v1.uploadMedia(filePath);
        let dateBefore = Date.now();
        let date = moment().format('MMMM Do YYYY, h:mm:ss a')
        await rwClient.v1.tweet(`Now, from Node.js at ${date}, ${status}`,{
            media_ids:mediaId,
        })
        let dateAfter = Date.now();
        console.log("Success pushing the tweet!")
        console.log(`Need ${dateAfter-dateBefore} ms long to push the tweet with an image`)
    } catch (error) {
        console.log("Error handling the tweet")
        console.log(error)
    }
}

module.exports = tweet