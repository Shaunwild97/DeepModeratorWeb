const express = require('express')
const Database = require('./app/deepdb')
const JsonUtil = require('./app/jsonutil')

const files = require('./app/sound')

const app = express()

app.get('/', (req, res) => {
    Database.getAllServers()
        .then(servers => { 
            servers.forEach(s => s.timeSinceUpdate = (new Date().getTime() - (new Date(s.lastUpdated))))
            const active = servers.filter(s => s.timeSinceUpdate < (1000 * 60 * 60 * 24 * 14)).length
            res.render('servers', { servers, count: servers.length, active }) 
        })
})

app.get('/server/:server', (req, res) => {
    Database.getServer(req.params.server)
        .then(server => res.render('server', { getTimeSince: JsonUtil.getTimeSince, server, serverConfig: JsonUtil.prettifyAsHTML(JSON.stringify(server, null, 2)) }))
})

app.get('/admin', (req, res) => {
    res.render('admin.pug')
})

app.post('/admin', (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send(req.body)
})

app.set('view engine', 'pug')
app.listen(50223, () => console.log("Web application started"))
