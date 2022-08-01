const { sendHttp } = require("./helpers");
const slack = require("slack");

module.exports = class SlackService{
    constructor({token}){
        this.token = token;
    }

    checkToken(){
        if (!this.token){
            throw 'Must provide a slack authentication token for this action.';
        }
    }

    static from(params, settings){
        return new SlackService({
            token: params.SLACK_TOKEN || settings.SLACK_TOKEN
        });
    }
    
    async sendMessage({channel, msg}){
        this.checkToken();
        if (!channel || !msg) {
            throw "Didn't provide one of the required parameters.";
        }
        return slack.chat.postMessage({
            token: this.token,
            channel: channel,
            text: msg
        });
    }
    
    async sendIncomingWebhook({webhookUrl, message}){
        if (!webhookUrl || !message) {
            throw "Didn't provide one of the required parameters.";
        }

        const body = (typeof message == "string") ? {text: message} : message;
        
        return sendHttp({
            url: webhookUrl, 
            httpMethod: "POST",
            body: body
        });
    }
    
    async createGroup({name}){
        if (!name) throw "Must provide name of new group to create.";
        return slack.usergroups.create({
            token: this.token,
            name
        });
    }
    
    async groupInvite({group, users}){
        this.checkToken();
        if (!group || !users || users.length === 0) {
            throw "Didn't provide one of the required parameters.";
        }
        const curUsers = (await slack.usergroups.users.list({
            token: this.token,
            usergroup: group
        })).users;
        return slack.usergroups.users.update({
            token: this.token,
            users: curUsers.concat(users).join(",")
        });
    }
    
    async listChannels(){
        this.checkToken();
        const {channels: result} = await slack.conversations.list({
            token: this.token,
            exclude_archived: true,
            types: "public_channel,private_channel"
        });
        return result;
    }
    
    async listGroups(){
        this.checkToken();
        const {usergroups: result} = await slack.usergroups.list({token: this.token});
        return result;
    }
    
    async listUsers(){
        this.checkToken();
        const {members: result} = await slack.users.list({token: this.token});
        return result;
    }
}