const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()
const router = express.Router()

mongoose.connect(config.connectionString)

const Product = require('./models/products')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRoutes = require('./routes/index')
const productsRoutes = require('./routes/productsRoutes')
const orderRoutes = require('./routes/orderRoutes')
const customerRoutes = require('./routes/customerRoutes')

app.use(bodyParser.json({
    limit: '5mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use('/', indexRoutes)
app.use('/produtcs', productsRoutes)
app.use('/customer', customerRoutes)
app.use('/order', orderRoutes)

module.exports = app
