const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index', {
    appToken: process.env.SMOOCH_APP_TOKEN
  })
})

module.exports = app
