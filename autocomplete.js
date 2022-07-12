const _ = require("lodash");
const slackListFunctions = require("./slack-list-functions");

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
  listChannelsAuto: createAutocompleteFromListFunction(slackListFunctions.listChannels, "channels"),
  listGroupsAuto: createAutocompleteFromListFunction(slackListFunctions.listGroups, "usergroups"),
  listUsersAuto: createAutocompleteFromListFunction(slackListFunctions.listUsers, "members"),
};
