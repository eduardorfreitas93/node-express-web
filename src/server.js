// habilitar .env
require('dotenv').config()

const express = require('express')
const session = require('express-session')
const FileSession = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.view()
    this.routes()
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }))

    // start auth session
    this.express.use(session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: true,
      store: new FileSession({
        path: path.resolve(__dirname, '..', 'tmp', 'sessions')
      }),
      saveUninitialized: true
    }))
  }

  view() {
    // start view njk
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true,
    })

    // config path static
    this.express.use(express.static(path.resolve(__dirname, 'public')))

    // config message flash
    this.express.use(flash())

    // set motor view .njk
    this.express.set('view engine', 'njk')
  }

  routes() {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
