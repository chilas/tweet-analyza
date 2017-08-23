"use latest"
const axios = require("axios").default;
module.exports = function (ctx, done) {
    var secrets = {
        apiKey: ctx.secrets.nlpApiKey,
        slackWebhookURL: ctx.secrets.slackWebhookURL
    };

    var tweet = {
        main: {
            userName: ctx.data.from,
            text: ctx.data.text,
            url: ctx.data.url
        },
        nlpConfig: {
            document: {
                type: "PLAIN_TEXT",
                content: ctx.data.text
            },
            encodingType: "UTF8"
        }
    };

    checkSentiment(secrets, tweet, () => {
        console.log(tweet);
        done(null, `complete!`);
    });
};

function checkSentiment(secrets, tweetData, cb) {
    axios.post(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${secrets.apiKey}`, tweetData.nlpConfig)
        .then(res => {
            if (res.data.documentSentiment.score < 0) {
                console.log("Negative tweet")
                return isNegative(secrets, tweetData.main)
            } else {
                //TODO: some other action.
                console.log("Positive tweet")
            }
        })
        .then(() => {
            cb();
        })
        .catch(err => { handleErrors("NLP", err) });
}

function isNegative(secrets, tweetData) {
    axios.post(secrets.slackWebhookURL, {
        text: `*${tweetData.userName}*\n> _${tweetData.text}_\n ${tweetData.url}`
    }).catch(err => { handleErrors("Slack", err) });
}

function handleErrors(caller, reason) {
    console.log(`${caller} failed: ${reason}`);
}