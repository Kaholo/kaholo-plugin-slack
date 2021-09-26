# kaholo-plugin-slack
Kaholo plugin for integration with Slack API.

## Settings
1. Access Token (Vault) **Required if not in action** - Default Slack access token to use for authentication if no other token was provided. You can see more info on Slack access tokens [here](https://api.slack.com/authentication/token-types).

## Method: Send Message
Send a message in the specified channel or group.

### Parameters
1. Access Token (Vault) **Required if not in settings** - Slack access token to use for authentication for this request only.
2. Channel/Group ID (String) **Required** - The ID of the channel or the group to send the message to.
3. Text (String) **Required** - The content of the message.

## Method: Send Incoming Webhook
Send a message to slack using the specified webhook.

### Parameters
1. Webhook URL (Vault) **Required** - The URL of the webhook to send the message to.
2. Message (String|Object) **Required** - The message to send. Can either be normal text, or you can pass an object from code. You can see more info on the accepted format of object [here](https://api.slack.com/messaging/webhooks#advanced_message_formatting)

## Method: Create User
Create a new slack user.

### Parameters
1. Access Token (Vault) **Required if not in settings** - Slack access token to use for authentication for this request only.
2. Email (String) **Required** - The email of the new user to be created.
3. Channel/Group IDs (Text) **Optional** - If provided, will add the user to the provided channels and groups. Can enter multiple values by separating each with a new line or comma.

## Method: Create Group
Create a new slack group.

### Parameters
1. Access Token (Vault) **Required if not in settings** - Slack access token to use for authentication for this request only.
2. Name (String) **Required** - The name of the group to be created.

## Method: Invite User To Group
Invite the specified user to the specified group.

### Parameters
1. Access Token (Vault) **Required if not in settings** - Slack access token to use for authentication for this request only.
2. Group ID (String) **Required** - The ID of the group to invite the user to.
3. User ID (String) **Required** - The ID of the user to be invited to the group.
