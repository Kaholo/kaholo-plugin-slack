const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { default: axios } = require("axios");
const slack = require("slack");

const autocomplete = require("./autocomplete");
const slackListFunctions = require("./slack-list-functions");

function sendMessageToChannel({
  slackToken: token,
  channel,
  text,
}) {
  return slack.chat.postMessage({
    token,
    channel,
    text,
  });
}

function sendMessageToUser({
  slackToken: token,
  user,
  text,
}) {
  return slack.chat.postMessage({
    token,
    channel: user,
    text,
  });
}

function sendIncomingWebhook({
  webhookUrl,
  message,
}) {
  return axios({
    method: "POST",
    url: webhookUrl,
    body: JSON.stringify({
      text: message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function createGroup({
  slackToken: token,
  name,
}) {
  return slack.usergroups.create({
    token,
    name,
  });
}

async function groupInvite({
  slackToken: token,
  channel,
  userId,
}) {
  const { users: currentUserIds } = await slack.usergroups.users.list({
    token,
    usergroup: channel,
  });

  return slack.usergroups.users.update({
    token,
    usergroup: channel,
    users: currentUserIds.concat(userId).join(","),
  });
}

module.exports = kaholoPluginLibrary.bootstrap(
  {
    sendMessageToChannel,
    sendMessageToUser,
    sendIncomingWebhook,
    createGroup,
    groupInvite,
    ...slackListFunctions,
  },
  autocomplete,
);
