import {createOpenAPI, createWebsocket} from 'qq-guild-bot';
import fetch from 'node-fetch';

async function getGatewayInfo(botToken) {
    const response = await fetch('https://api.sgroup.qq.com/gateway/bot', {
        headers: {
            Authorization: `Bot 102075770.${botToken}`
        }
    });
    const data = await response.json();
    return data;
}

const gatewayInfo = await getGatewayInfo('KLVPszuk1KlUkXQHoGPsvtK57GNSlSgX')
const { url, shards } = gatewayInfo;

console.log(`建议分片数: ${shards}`);

const config = {
    appID: '102075770', // 申请机器人时获取到的机器人 BotAppID
    token: 'UmGUf8eLH42vPG5MP4tkb8NDUwgbwfHf', // 申请机器人时获取到的机器人 BotToken
    intents: ['PUBLIC_GUILD_MESSAGES','DIRECT_MESSAGE','GUILD_MEMBERS'], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

// 创建 client
const client = createOpenAPI(config);

// 创建 websocket 连接
const ws = createWebsocket(config);

// 消息监听
ws.on('READY', (wsdata) => {
    console.log('[READY] 事件接收 :', wsdata);
});
ws.on('ERROR', (data) => {
    console.log('[ERROR] 事件接收 :', data);
});
ws.on('GROUP_AT_MESSAGE_CREATE', (data) => {
    console.log('[GUILDS] 事件接收 :', data);
});
ws.on('message.group.@.me',(date) => {
    console.log(date)
});

