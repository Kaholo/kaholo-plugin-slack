const _ = require("lodash");
const slackService = require("./slack-service");

function createAutocompleteFromListFunction(listFunction, dataPath) {
  return async (query, params) => {
    const listResult = await listFunction(params);
    const items = _.get(listResult, dataPath);

    const filteredItems = items.filter(({ id, name }) => (
      id.toLowerCase().includes(query.toLowerCase())
      || name.toLowerCase().includes(query.toLowerCase())
    ));

    return filteredItems.map(({ id, name }) => ({ id, value: name }));
  };
}

module.exports = {
  listChannelsAuto: createAutocompleteFromListFunction(
    ({ slackToken }) => slackService.listChannels({ token: slackToken }),
    "channels",
  ),
  listGroupsAuto: createAutocompleteFromListFunction(
    ({ slackToken }) => slackService.listGroups({ token: slackToken }),
    "usergroups",
  ),
  listUsersAuto: createAutocompleteFromListFunction(
    ({ slackToken }) => slackService.listUsers({ token: slackToken }),
    "members",
  ),
};
