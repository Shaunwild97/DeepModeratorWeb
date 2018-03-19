const express = require('express')
const Database = require('./app/deepdb')
const JsonUtil = require('./app/jsonutil')

const app = express()

app.get('/', (req, res) => {
    Database.getAllServers()
        .then(servers => res.render('servers', { servers, count: servers.length }))
})

app.get('/:server', (req, res) => {
    Database.getServer(req.params.server)
        .then(server => res.render('server', { getTimeSince: JsonUtil.getTimeSince, server, serverConfig: JsonUtil.prettifyAsHTML(JSON.stringify(server, null, 2)) }))
})

app.set('view engine', 'pug')
app.listen(50223, () => console.log("Web application started"))
