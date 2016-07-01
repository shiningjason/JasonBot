const app = require('./app')
const handleWebhook = require('./handleWebhook')

app.post('/webhook', handleWebhook)

const server = app.listen(process.env.PORT || 8000, () => {
  var host = server.address().address
  var port = server.address().port

  console.log('JasonBot listening at http://%s:%s', host, port);
})
