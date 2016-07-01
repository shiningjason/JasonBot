const { Bot } = require('smooch-bot')

class ConsoleBot extends Bot {
  constructor(options) {
    super(options)
  }

  say(text) {
    return new Promise((resolve) => {
      console.log(text)
      resolve()
    })
  }
}

module.exports = ConsoleBot
