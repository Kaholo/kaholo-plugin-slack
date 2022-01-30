# kaholo-plugin-slack
Kaholo plugin for integration with Slack API.

## How To Use
To get started with the Slack Plugin, you first need to:
* create a new Slack app as described [here](https://api.slack.com/authentication/basics);
* install the Slack app to your workspace as described [here](https://api.slack.com/authentication/basics#installing);
* generate the authentication token from the Slack app; it can be either a Bot token or a User token. You can find more information on access tokens [here](https://api.slack.com/authentication/token-types).

The full list of scopes of permissions the Slack app will need is:
* ```channels:read```
* ```channels:write```
* ```chat:write```
* ```groups:read```
* ```im:read```
* ```mpim:read```
* ```usergroups:read```
* ```usergroups:write```
* ```users:read```

##  Settings
1. Access Token (Vault) **Required if not in action** - Default Slack access token to use for authentication if no other token was provided.
    

## Method: Send Message To Channel
Send a message to a specified channel.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. Channel (Autocomplete) **Required** - The channel you want to send a message to.
    [Learn More](https://api.slack.com/types/channel)
3. Text (text) **Required** - Message content.
    [Learn More](https://slack.com/help/categories/200111606)

## Method: Send Message To User
Send a message to a specified user.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. User (Autocomplete) **Required** - The user you want to send a message to.
    [Learn More](https://api.slack.com/types/channel)
3. Text (text) **Required** - Message content.
    [Learn More](https://slack.com/help/categories/200111606)

## Method: Send Incoming Webhook
Send a message to the specified incoming Webhook.
(No access token required)

## Parameters
1. Webhook URL (Vault) **Required** - The URL of the webhook to send the message to.
    [Learn More](https://api.slack.com/messaging/webhooks)
2. Message (String) **Required** - The message to send. Can either be normal text, or you can pass an object from code.
    [Learn More](https://api.slack.com/messaging/webhooks#advanced_message_formatting)


## Method: Create User Group
Creates a new user group.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. Name (String) **Required** - Name for the created user group.
    [Learn More](https://slack.com/help/articles/212906697-Create-a-user-group)

## Method: Add Users To User Group
Add the specified users to the user group.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. Group (Autocomplete) **Required** - Add the user to the specified group.
    [Learn More](https://api.slack.com/types/group)
3. Users (Autocomplete) **Required** - The user(s) to add to the group. Can enter multiple values by passing an array of user IDs from code.
    [Learn More](https://api.slack.com/methods/users.identity)

## Method: List Channels
List all channels the user has access to in the current workspace.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)

## Method: List Groups
List all user groups in the current workspace.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)

## Method: List Users
List all users in the current workspace.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
