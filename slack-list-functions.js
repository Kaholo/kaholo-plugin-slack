const slack = require("slack");

function listChannels({
  slackToken: token,
}) {
  return slack.conversations.list({
    token,
    exclude_archived: true,
    types: "public_channel,private_channel",
  });
}

function listGroups({
  slackToken: token,
}) {
  return slack.usergroups.list({ token });
}

function listUsers({
  slackToken: token,
}) {
  return slack.users.list({ token });
}

module.exports = {
  listGroups,
  listChannels,
  listUsers,
};
