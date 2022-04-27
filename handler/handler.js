const { TwitterApi } =  require('twitter-api-v2')
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})

const client = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

const postTweet = (req,h) =>{
    const tweet = async ()=>{
        try {
            //const { status }  = req.payload
            //await rwClient.v1.tweet(status)
            console.log("Success")
        } catch (error) {
            const response = h.response({
                status : "fail",
                message : error,
            })
            response.code(400);
            return response
        }
    }
    tweet()
    const response = h.response({
        status : "Success",
        message : "Sukses manambahkan tweet baru",
    })
    response.code(201);
    return response
}


module.exports = {postTweet}