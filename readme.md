# Description
This is a really micro Tweet Sentiment Analyser that checks for negative tweets to a particular handle _most likely yours_ and sends them to your slack channel for you to take action.

## Setup
### Google Natural Language API
* Create a new project on your google cloud dashboard _This is assuming you have GCP all set up_.
* Enable the Google Cloud Natural Language API
* Click on Credentials and create a new API key

### Slack
* [Create](https://api.slack.com/apps) a new slack app
* Select *Incoming Webhooks* and activate it
* Click on **Add new webhook to team**
* Select channel to post messages to and click on **Authorize** when done.
* Copy the generated Webhook URL to a safe place.

### Webtask
* Sign up to [webtask.io](https://webtask.io) and create a new empy function on your dashboard.
* Copy over the code from the _app.js_ file into your new function
* You'd have to create two new secrets  
    *  **nlpApiKey:** which contains the api key for the nlp api
    * **slackWebhookURL:** Slack webhook api url

### IFTTT
* [Create](https://ifttt.com/create) a new IFTT applet
* Search and select Twitter
* Select the **New mention of you** card on the next page
* Search and select the WebHooks service
* Select the **Make a web request**
* In the URL section enter ```[WEBTASK_URL]?text=<<<{{Text}}>>>&from=<<<{{UserName}}>>>&url=<<<{{LinkToTweet}}>>>``` where [WEBTASK_URL] is the Url generated for your function by webtask.io and make sure the method is set to GET.

