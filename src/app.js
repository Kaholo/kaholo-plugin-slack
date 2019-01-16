const request = require('request');
const slack = require('slack')


function sendMessage(action) {
    return new Promise((resolve, reject) => {
        slack.chat.postMessage({ token: action.params.SLACK_TOKEN, channel: action.params.CHANNEL, text: action.params.TEXT }).then((res) => {
            return resolve(res);
        }).catch(err => {
            return reject(err)
        });
    })

}

function createUser(action) {
    return new Promise((resolve, reject) => {
        var SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';

        var QUERY_PARAMS = `email=${action.params.EMAIL}&token=${action.params.SLACK_TOKEN}`;
        if (action.params.CHANNEL)
            QUERY_PARAMS += `&channels=${action.params.CHANNEL}`;
        QUERY_PARAMS += `&set_active=true`

        request.get(`${SLACK_INVITE_ENDPOINT}?${QUERY_PARAMS}`, function (error, response, body) {
            error ? console.log("error", error.toJSON()) : null;
            if (body.includes("error")) {
                return reject(body)
            }
            return resolve(body)
        });
    })
}



function createGroup(action) {
    return new Promise((resolve, reject) => {
        slack.groups.create({ token: action.params.SLACK_TOKEN, name: action.params.NAME }).then(res => {
            return resolve(res)
        }).catch(error => {
            return reject(error)
        })
    })
}


function groupInvite(action) {
    return new Promise((resolve, reject) => {
        slack.groups.invite({ token: action.params.SLACK_TOKEN, channel: action.params.CHANNEL, user: action.params.USER_ID }).then(res => {
            return resolve(res)
        }).catch(error => {
            return reject(error)
        })
    })
}


module.exports = {
    sendMessage: sendMessage,
    createUser: createUser,
    createGroup: createGroup,
    groupInvite: groupInvite
}


