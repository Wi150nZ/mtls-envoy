const express = require('express')

const app = express()

app.get('/', (_, res) => {
    console.log('server got request')

    res.send('Hello, secured world!')
})

app.listen(8081, () => console.log('server running on port 8081'))