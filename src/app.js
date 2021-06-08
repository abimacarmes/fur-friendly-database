require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const databaseService = require('./databaseService')
const knex = require('knex')
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())

app.use(
    cors({
        origin: 'https://fur-friendly-spaces.vercel.app/'
    })
);

app.get('/api/', (req,res) => {
    res.send("Database Endpoint Homepage")
})

app.get('/api/spaces', (req,res, next) => {
    const knexInstance = req.app.get('db')
    databaseService.getAllSapces(knexInstance)
        .then(spaces => res.json(spaces))
        .catch(next)
})

app.post('/api/spaces', (req, res, next) => {
    const knexInstance = req.app.get('db')
    const {id,name,address,city,type} = req.body
    const newSpace = {id,name,address,city,type}

    databaseService.insertSpace(knexInstance, newSpace)
        .then(newSpace => res.json(newSpace))
        .catch(next)
})

app.patch('/api/spaces/:id', (req,res,next) => {
    const knexInstance = req.app.get('db')
    const {id,upCount,downCount} = req.body

    databaseService.updateSpace(knexInstance, id, upCount, downCount)
    .then(updatedSpace => res.json(updatedSpace))
        .catch(next)
})

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(function errorHandler(error, req, res, next){
    let response
    if(NODE_ENV ==='production'){
        response = {error: {message: error.message}}
    }
    else{
        console.error(error)
        response = {message: error.message,error}
    }
    res.status(500).json(response)
})

app.use(morgan(morganOption))
app.use(helmet())


module.exports = app
