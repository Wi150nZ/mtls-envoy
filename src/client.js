const express = require('express')
const fetch = require('isomorphic-fetch')

const app = express()
const SERVER_URL = 'http://localhost:10001'

app.get('/', async (_, res) => {
    console.log('client got request')

    const server_resp = await fetch(SERVER_URL)
    const resp_text = await server_resp.text()

    res.send(resp_text)
})

app.listen(8080, () => console.log('client running on port 8080'))