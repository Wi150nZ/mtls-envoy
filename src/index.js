const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.send('Hello, secured world!')
})

app.listen(8080, () => console.log('running on port 8080'))