const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { default: axios } = require("axios");

const autocomplete = require("./autocomplete");
const slackService = require("./slack-service");

function sendMessageToChannel(params) {
  const {
    slackToken,
    channel,
    text,
  } = params;

  return slackService.sendMessage({
    token: slackToken,
    text,
    channel,
  });
}

function sendMessageToUser(params) {
  const {
    slackToken,
    user,
    text,
  } = params;

  return slackService.sendMessage({
    token: slackToken,
    channel: user,
    text,
  });
}

async function inviteUserToGroup(params) {
  const {
    slackToken,
    channel,
    userId,
  } = params;

  const currentUserIds = await slackService.listUsersInGroup({
    token: slackToken,
    usergroup: channel,
  });

  return slackService.updateUsersInGroup({
    token: slackToken,
    usergroup: channel,
    users: currentUserIds.concat(userId).join(","),
  });
}

async function sendIncomingWebhook(params) {
  const {
    webhookUrl,
    message,
  } = params;

  const { data } = await axios({
    method: "POST",
    url: webhookUrl,
    data: {
      text: message,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

function createGroup(params) {
  const {
    slackToken,
    name: groupName,
  } = params;

  return slackService.createGroup({
    token: slackToken,
    name: groupName,
  });
}

function listChannels(params) {
  const { slackToken } = params;

  return slackService.listChannels({
    token: slackToken,
  });
}

function listGroups(params) {
  const { slackToken } = params;

  return slackService.listGroups({
    token: slackToken,
  });
}

function listUsers(params) {
  const { slackToken } = params;

  return slackService.listUsers({
    token: slackToken,
  });
}

module.exports = kaholoPluginLibrary.bootstrap(
  {
    sendMessageToChannel,
    sendMessageToUser,
    groupInvite: inviteUserToGroup,
    sendIncomingWebhook,
    createGroup,
    listChannels,
    listGroups,
    listUsers,
  },
  autocomplete,
);
