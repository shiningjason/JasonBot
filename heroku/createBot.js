const {
  SmoochApiBot,
  SmoochApiStore,
  MemoryLock
} = require('smooch-bot')

const {
  BOT_NAME,
  BOT_AVATAR_URL
} = require('../lib/constants')

const store = new SmoochApiStore({ jwt })
const lock = new MemoryLock()

function createBot(appUser) {
  return new SmoochApiBot({
    store,
    lock,
    name: BOT_NAME,
    avatarUrl: BOT_AVATAR_URL,
    userId: appUser.userId || appUser._id
  })
}

module.exports = createBot
