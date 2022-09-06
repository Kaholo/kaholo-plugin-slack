# Kaholo Slack Plugin
This plugin integrates Kaholo with Slack. Slack is a popular instant messaging application for business. The plugin provides methods primarily manage users and send messages. For example, a pipeline that does an automated CI/CD of a produce might send a message to a Slack channel to notify users of the build status, test results, and a link to the new deployment.

## Prerequisites
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

## Access and Authentication
This plugin makes use of Kaholo Accounts. The only parameter required is a Bot User OAuth Token, as provided by Slack. Regular user tokens also work in this parameter but for Kaholo automation a Bot token is most commonly used. A Slack bot token is a complex string with a form similar to this example: `xoxb-3196512348512-3751123471398-TSSGvZckZLEKGWR6a9qCRdSMh`.

## Plugin Installation
For download, installation, upgrade, downgrade and troubleshooting of plugins in general, see [INSTALL.md](./INSTALL.md).

## Plugin Settings
This plugin has no default settings. Only a token in the Kaholo Account is required. All other configuration is done at Action level inside the pipelines.

## Method: Send Message To Channel
Send a text message to the specified channel.

### Parameters
* Channel (Autocomplete) - The channel that will receive the message [Learn More](https://api.slack.com/types/channel)
* Text - The message that will be sent

## Method: Send Message To User
Send a direct message to the specified user.

### Parameters
* User (Autocomplete) - The user that will receive the message
* Text - The message that will be sent

## Method: Send Incoming Webhook
This method sends messages to Slack via webhook. Slack allows webhooks to be specified so that notifications can be sent to Slack without authentication - no token required. The URL of the webhook is complex and doubles as a sort of password so that only parties who know the URL can send messages successfully. For this reason it is protected in the Kaholo Vault. [Learn More](https://api.slack.com/messaging/webhooks)

### Parameters
* Webhook URL (Vault) - The URL of the webhook that will receive the message
* Message - The message that will be sent

## Method: Create User Group
Creates a new user group. [Learn More](https://slack.com/help/articles/212906697-Create-a-user-group)

### Parameters
* Name - the name of the new user group

## Method: Add Users To User Group
Add the specified users to the user group.

### Parameters
* Group - the group to which the user(s) will be added
* Users - the user(s) that will be added to the group

## Method: List Channels
Lists all channels in the current workspace. This lists only channels the user/bot has privileges to access. No additional parameters are required for this method.

## Method: List Groups
Lists all groups in the current workspace. This lists only groups the user/bot has privileges to access. No additional parameters are required for this method.

## Method: List Users
Lists all users in the current workspace. This lists only users the user/bot has privileges to access. No additional parameters are required for this method.
