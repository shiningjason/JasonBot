const {
  MemoryStore,
  MemoryLock,
  StateMachine
} = require('smooch-bot')

const ConsoleBot = require('./ConsoleBot')
const script = require('../lib/script')

const store = new MemoryStore()
const lock = new MemoryLock()

const bot = new ConsoleBot({
  store,
  lock,
  userId: 'testUserId'
})

const stateMachine = new StateMachine({
  script,
  bot
})

process.stdin.on('data', (data) => {
  stateMachine
    .receiveMessage({
      text: data.toString().trim()
    })
    .catch((err) => {
      console.error(err)
      console.error(err.stack)
    })
})
