const express = require('express')
const path = require('path')
const SERVER_PORT = process.env.PORT || 3333
const { db } = require('./db')
const todoRoute = require('./route/todo')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//app.use('/', express.static(__dirname + ''))
app.use('/public',express.static(path.join(__dirname,'public')))

app.use('/todos', todoRoute)

db.sync()
  .then(() => {
    app.listen(SERVER_PORT)
  })
  .catch((err) => {
    console.error(err)
  })