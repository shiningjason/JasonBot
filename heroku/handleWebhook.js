const { StateMachine } = require('smooch-bot')

const createBot = require('./createBot')
const jwt = require('./jwt')
const initWebhook = require('../lib/initWebhook')
const script = require('../lib/script')

if (process.env.SERVICE_URL) {
  const target = process.env.SERVICE_URL.replace(/\/$/, '') + '/webhook'
  initWebhook(jwt, target, ['message:appUser', 'postback'])
}

function handleMessages(req, res) {
  const messages = req.body.messages.reduce((prev, current) => {
    if (current.role === 'appUser') prev.push(current)
    return prev
  }, [])
  if (messages.length === 0) return res.end()

  const stateMachine = new StateMachine({
    script,
    bot: createBot(req.body.appUser)
  })
  stateMachine
    .receiveMessage(messages[0])
    .then(() => res.end())
    .catch((err) => {
      console.error('SmoochBot error:', err)
      console.error(err.stack)
      res.end()
    })
}

function handlePostback(req, res) {
  const postback = req.body.postbacks[0]
  if (!postback || !postback.action) return res.end()

  createBot(req.body.appUser)
    .say(`You said: ${postback.action.text} (payload was: ${postback.action.payload})`)
    .then(() => res.end())
}

function handleWebhook(req, res, next) {
  const trigger = req.body.trigger

  switch (trigger) {
    case 'message:appUser':
      handleMessages(req, res)
      break

    case 'postback':
      handlePostback(req, res)
      break

    default:
      console.log('Ignoring unknown webhook trigger:', trigger)
  }
}

module.exports = handleWebhook
