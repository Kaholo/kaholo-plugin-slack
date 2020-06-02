const request = require('request');
const slack = require('slack')

function _getToken(action, settings){
    return action.params.SLACK_TOKEN? action.params.SLACK_TOKEN : settings.SLACK_TOKEN;
}

function sendMessage(action, settings) {
     return slack.chat.postMessage({ token: _getToken(action,settings), channel: action.params.CHANNEL, text: action.params.TEXT });
}

function createUser(action, settings) {
    return new Promise((resolve, reject) => {
        var SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';

        var QUERY_PARAMS = `email=${action.params.EMAIL}&token=${_getToken(action,settings)}`;
        if (action.params.CHANNEL)
            QUERY_PARAMS += `&channels=${action.params.CHANNEL}`;
        QUERY_PARAMS += `&set_active=true`

        request.get(`${SLACK_INVITE_ENDPOINT}?${QUERY_PARAMS}`, function (error, response, body) {
            if (error) return reject(error);

            if (body.includes("error")) {
                return reject(body)
            }

            return resolve(body)
        });
    })
}



function createGroup(action, settings) {
    return slack.groups.create({ token: _getToken(action,settings), name: action.params.NAME });
}


function groupInvite(action, settings) {
    return slack.groups.invite({ token: _getToken(action,settings), channel: action.params.CHANNEL, user: action.params.USER_ID });
}

function sendIncomingWebhook(action,settings){
    return new Promise((resolve,reject)=>{
        
        if(typeof action.params.message == 'string'){
            action.params.message = {text: action.params.message}
        }

        const requestOptions = {
            url: action.params.webhookUrl,
            method: "post",
            json : true,
            body: action.params.message
        }
        
        request(requestOptions, function (error, response, body) {
            if (error) return reject(error);
            if(response.statusCode !== 200) return reject(response);
            
            return resolve(body)
        });
    })
}

module.exports = {
    sendMessage: sendMessage,
    createUser: createUser,
    createGroup: createGroup,
    groupInvite: groupInvite,
    sendIncomingWebhook: sendIncomingWebhook
}