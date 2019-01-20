const request = require('request');
const slack = require('slack')


function sendMessage(action, settings) {
     action.params.SLACK_TOKEN? token =  action.params.SLACK_TOKEN : token =  settings.SLACK_TOKEN;
     return slack.chat.postMessage({ token: token, channel: action.params.CHANNEL, text: action.params.TEXT });
}

function createUser(action, settings) {
    action.params.SLACK_TOKEN? token =  action.params.SLACK_TOKEN : token =  settings.SLACK_TOKEN;
    return new Promise((resolve, reject) => {
        var SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';

        var QUERY_PARAMS = `email=${action.params.EMAIL}&token=${token}`;
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
    action.params.SLACK_TOKEN? token =  action.params.SLACK_TOKEN : token =  settings.SLACK_TOKEN;
    return slack.groups.create({ token: token, name: action.params.NAME });
}


function groupInvite(action, settings) {
    action.params.SLACK_TOKEN? token =  action.params.SLACK_TOKEN : token =  settings.SLACK_TOKEN;
    return slack.groups.invite({ token: token, channel: action.params.CHANNEL, user: action.params.USER_ID });
}


module.exports = {
    sendMessage: sendMessage,
    createUser: createUser,
    createGroup: createGroup,
    groupInvite: groupInvite
}


