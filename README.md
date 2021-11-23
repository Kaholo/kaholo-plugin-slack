# kaholo-plugin-slack
Kaholo plugin for integration with Slack API.

## How To Use
In order for this plugin to work properly you need to create a slack app, install it on your workspace and get the Oauth token from the app. It can be either the Bot or User token of the app.
The full list of scopes of permissions the app will need is:
* channels:read
* channels:write
* chat:write
* groups:read
* im:read
* mpim:read
* usergroups:read
* usergroups:write
* users:read

##  Settings
1. Access Token (Vault) **Required if not in action** - Default Slack access token to use for authentication if no other token was provided.
    

## Method: Send Message To Channel
Send a message in the specified channel.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. Channel (Autocomplete) **Required** - Send the message to this channel.
    [Learn More](https://api.slack.com/types/channel)
3. Text (text) **Required** - Message content.
    [Learn More](https://slack.com/help/categories/200111606)

## Method: Send Message To User
Send a message to specified user.

## Parameters
1. Access Token (Vault) **Required if not in settings** - Access token to authenticate.
    [Learn More](https://api.slack.com/authentication/token-types)
2. User (Autocomplete) **Required** - Send the message to this user.
    [Learn More](https://api.slack.com/types/channel)
3. Text (text) **Required** - Message content.
    [Learn More](https://slack.com/help/categories/200111606)

## Method: Send Incoming Webhook
Send a message to the specified incoming Webhook
(No acces token required)

## Parameters
1. Webhook URL (Vault) **Required** - The URL of the webhook to send the message.
    [Learn More](https://api.slack.com/messaging/webhooks)
2. Message (String) **Required** - The message to send. Can either be normal text, or you can pass an object from code.
    [Learn More](https://api.slack.com/messaging/webhooks#advanced_message_formatting)


## Method: Create User Group
Create a new user group

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
