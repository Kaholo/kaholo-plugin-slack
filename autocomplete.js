const parsers = require("./parsers");
const SlackService = require("./slack.service");

const MAX_RESULTS = 10;

// auto complete helper methods

function mapAutoParams(autoParams) {
  const params = {};
  autoParams.forEach((param) => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

/** *
 * @returns {[{id, value}]} filtered result items
 ** */
function handleResult(result, query, getFunc) {
  if (!result || result.length === 0) {
    return [];
  }
  const items = result.map((item) => (getFunc ? getFunc(item) : getAutoResult(item.id, item.name)));
  return filterItems(items, query);
}

/** *
 * @returns {{id, value}} formatted autocomplete item
 ** */
function getAutoResult(id, value) {
  return {
    id: id || value,
    value: value || id,
  };
}

function filterItems(inputItems, query) {
  let items = inputItems;
  if (query) {
    const qWords = query.split(/[. ]/g).map((word) => word.toLowerCase()); // split by '.' or ' ' and make lower case
    items = items.filter((item) => qWords.every((word) => item.value.toLowerCase().includes(word)));
    items = items.sort((word1, word2) => (
      word1.value.toLowerCase().indexOf(qWords[0]) - word2.value.toLowerCase().indexOf(qWords[0])
    ));
  }
  return items.splice(0, MAX_RESULTS);
}

function listAuto(listFuncName, getFunc) {
  return async (query, pluginSettings, triggerParameters) => {
    const settings = mapAutoParams(pluginSettings);
    const params = mapAutoParams(triggerParameters);
    const client = SlackService.from(params, settings);
    const result = await client[listFuncName]();
    const items = handleResult(result, query, getFunc);
    return items;
  };
}

module.exports = {
  listChannelsAuto: listAuto("listChannels"),
  listGroupsAuto: listAuto("listGroups"),
  listUsersAuto: listAuto("listUsers", (user) => getAutoResult(user.id, user.name || user.email)),
};
