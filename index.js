const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cv = require('opencv4nodejs')
const port = 3000
const FPS = 10

const wCap = new cv.VideoCapture(0)
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 1000)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 1000)

app.get('/', (_request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'))
})

setInterval(() => {
    const frame = wCap.read()
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('image', image)
}, 1000 / FPS)

server.listen(port, () => console.log(`server is running on http://localhost:${port}`))