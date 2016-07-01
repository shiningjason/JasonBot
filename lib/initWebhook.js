const SmoochCore = require('smooch-core')

function createWebhook(smoochCore, target, triggers) {
  return smoochCore.webhooks
    .create({ target, triggers })
    .then((res) => {
      console.log('Smooch webhook created with target', res.webhook.target)
    })
    .catch((err) => {
      console.error('Error creating Smooch webhook:', err)
      console.error(err.stack)
    })
}

function updateWebhook(smoochCore, webhookId, triggers) {
  return smoochCore.webhooks
    .update(webhookId, { triggers })
    .then((res) => {
      console.log('Smooch webhook updated with missing triggers', res.webhook.target)
    })
    .catch((err) => {
      console.error('Error updating Smooch webhook:', err)
      console.error(err.stack)
    })
}

function initWebhook(jwt, target, triggers) {
  const smoochCore = new SmoochCore({ jwt })

  smoochCore.webhooks
    .list()
    .then((res) => {
      const webhook = res.webhooks.find((w) => w.target === target)
      if (!webhook) return createWebhook(smoochCore, target, triggers)

      const hasAllTriggers = triggers.every((t) => webhook.triggers.indexOf(t) !== -1)
      if (!hasAllTriggers) updateWebhook(smoochCore, webhook._id, triggers)
    })
}

module.exports = initWebhook
