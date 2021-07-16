const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
})

const production = {
  name: "production",
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: process.env.DB_NAME,
  db_URI: process.env.DB_URI,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: {stream: accessLogStream}
  }
};

module.exports = eval(process.env.THE_HEX_ENVIRONMENT);
