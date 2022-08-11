const slack = require("slack");

function sendMessage({
  token,
  channel,
  text,
}) {
  return slack.chat.postMessage({
    token,
    channel,
    text,
  });
}

function createGroup({
  token,
  name,
}) {
  return slack.usergroups.create({
    token,
    name,
  });
}

async function listUsersInGroup({
  token,
  usergroup,
}) {
  const { users } = await slack.usergroups.users.list({
    token,
    usergroup,
  });

  return users;
}

async function updateUsersInGroup({
  token,
  usergroup,
  users,
}) {
  return slack.usergroups.users.update({
    token,
    usergroup,
    users,
  });
}

function listChannels({ token }) {
  return slack.conversations.list({
    token,
    exclude_archived: true,
    types: "public_channel,private_channel",
  });
}

function listGroups({ token }) {
  return slack.usergroups.list({ token });
}

function listUsers({ token }) {
  return slack.users.list({ token });
}

module.exports = {
  listGroups,
  listChannels,
  listUsers,
  sendMessage,
  createGroup,
  listUsersInGroup,
  updateUsersInGroup,
};
