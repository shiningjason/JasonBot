const handleWebhook = require('./handleWebhook')

const app = require('./app')

app.post('/webhook', handleWebhook)

const server = app.listen(process.env.PORT || 8000, () => {
  var host = server.address().address
  var port = server.address().port

  console.log('Jason Bot listening at http://%s:%s', host, port);
})
