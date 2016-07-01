const jsonwebtoken = require('jsonwebtoken')

const jwt = jsonwebtoken.sign(
  {
    scope: 'app'
  },
  process.env.SMOOCH_SECRET,
  {
    headers: {
      kid: process.env.SMOOCH_KEY_ID
    }
  }
)

module.exports = jwt
