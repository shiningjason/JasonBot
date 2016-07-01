const { Script } = require('smooch-bot')
const { Wit } = require('node-wit')
const uuid = require('node-uuid')

const { WIT_ACCESS_TOKEN } = require('./constants')

const wit = new Wit({ accessToken: WIT_ACCESS_TOKEN })

module.exports = new Script({
  start: {
    receive: (bot) => bot
      .say('嗨，我是甲唯嘶，初次見面！')
      .then(() => 'converse')
  },
  converse: {
    receive: (bot, msg) => wit
      .converse(uuid.v1(), msg.text, {})
      .then((res) => bot.say(res.msg))
      .then(() => 'converse')
      .catch(() => 'error')
  }
})
