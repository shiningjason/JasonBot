const { StateMachine } = require('smooch-bot')

const createBot = require('./createBot')
const jwt = require('./jwt')
const initWebhook = require('../lib/initWebhook')
const script = require('../lib/script')

const TRIGGER_MESSAGE_APPUSER = 'message:appUser'
const TRIGGER_POSTBACK = 'postback'

if (process.env.SERVICE_URL) {
  const target = process.env.SERVICE_URL.replace(/\/$/, '') + '/webhook'
  initWebhook(jwt, target, [TRIGGER_MESSAGE_APPUSER, TRIGGER_POSTBACK])
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
      console.error('JasonBot error:', err)
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

  console.log('JasonBot trigger:', trigger)

  switch (trigger) {
    case TRIGGER_MESSAGE_APPUSER:
      handleMessages(req, res)
      break

    case TRIGGER_POSTBACK:
      handlePostback(req, res)
      break

    default:
      console.log('Ignoring unknown webhook trigger:', trigger)
  }
}

module.exports = handleWebhook
