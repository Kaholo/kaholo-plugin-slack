const parsers = require("./parsers");
const SlackService = require('./slack.service');

async function sendMessageToChannel(action, settings){
    const { CHANNEL: channel, group, TEXT: msg } = action.params;
    const slackService = SlackService.from(action.params, settings);
    return slackService.sendMessage({
        channel: parsers.autocomplete(channel),
        group: parsers.autocomplete(group),
        msg
    });
}

async function sendMessageToUser(action, settings){
    const { user, group, TEXT: msg } = action.params;
    const slackService = SlackService.from(action.params, settings);
    return slackService.sendMessage({
        channel: parsers.autocomplete(user),
        group: parsers.autocomplete(group),
        msg
    });
}

async function sendIncomingWebhook(action, settings){
    const { webhookUrl, message } = action.params;
    const slackService = SlackService.from(action.params, settings);
    return slackService.sendIncomingWebhook({
        webhookUrl: parsers.string(webhookUrl),
        message: parsers.string(message)
    });
}

async function createGroup(action, settings){
    const { NAME: name } = action.params;
    const slackService = SlackService.from(action.params, settings);
    return slackService.createGroup({
        name: parsers.string(name)
    });
}

async function groupInvite(action, settings){
    const { CHANNEL: group, USER_ID: users } = action.params;
    const slackService = SlackService.from(action.params, settings);
    return slackService.groupInvite({
        group: parsers.autocomplete(group),
        users: parsers.autocompleteOrArray(users)
    });
}

async function listChannels(action, settings){
    const slackService = SlackService.from(action.params, settings);
    return slackService.listChannels();
}

async function listGroups(action, settings){
    const slackService = SlackService.from(action.params, settings);
    return slackService.listGroups();
}

async function listUsers(action, settings){
    const slackService = SlackService.from(action.params, settings);
    return slackService.listUsers();
} 

module.exports = {
    sendMessageToChannel,
    sendMessageToUser,
	sendIncomingWebhook,
	createGroup,
	groupInvite,
	listChannels,
	listGroups,
	listUsers,
    // Autocomplete Functions
    ...require("./autocomplete")
}