'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('逼波逼波...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot
                .say('您好，初次見面，我是 Jason 的機器人 Eason！')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('請問您叫什麼名字呢?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot
                .setProp('name', name)
                .then(() => bot.say(`太棒了，很高興認識你！那我就稱呼您 ${name} 囉？ %[Y](postback:yes) %[N](postback:no)`))
                .then(() => 'speak');
        }
    },

    speak: {
        receive: (bot, message) => {
            return bot
                .say(() => processMessage(message))
                .then(() => 'speak');
        }
    }
});

function processMessage(message) {
    if (message.indexOf('愛你') !== -1) {
        return '我也愛你呢！';
    }
    return '我家主人沒教我這個詞 GG！';
}
