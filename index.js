require('dotenv').config()
const {syncModels, checkConnection} = require('./database/index.js')
const { addRelationsToModels } = require('./database/models.js')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

async function checkAndSyncSQL() {
    await checkConnection()
    addRelationsToModels()
    await syncModels()
}

function initAndListen(){
    const app = express()
    .use(cors())
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', require('./api/routes'))
    .listen(3000, () => {
        console.log(`Listening on port mate ${3000}`)
    })
}

async function startAPI(){
    await checkAndSyncSQL()
    initAndListen()
}

startAPI()