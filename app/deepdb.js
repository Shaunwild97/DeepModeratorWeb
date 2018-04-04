const { Pool } = require('pg')
const fs = require('fs')

const pool = new Pool(JSON.parse(fs.readFileSync(require('os').homedir() + '/.nodekeys/deep-postgres-credentials.key', 'utf-8')))

module.exports = {
    async getAllServers() {
        const servers = await pool.query('SELECT * FROM config')

        if (servers.rowCount) {
            const result = []

            for (let server of servers.rows) {
                const serverObj = JSON.parse(server.data)
                serverObj.serverId = server.server_id

                if (serverObj.serverName) {
                    result.push(serverObj)
                }
            }

            return result
        }
    },

    async getServer(id) {
        const server = await pool.query('SELECT * FROM config WHERE server_id=$1', [id])

        if (server.rowCount) {
            const result = server.rows[0]
            return JSON.parse(result.data)
        }
    }
}
