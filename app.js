
const express = require(`express`)//get,post we use now
const cors = require(`cors`)
const http = require(`http`) // url


 

let app = express()
app.use(cors())
app.use(express.json())


// routes
app.use('/api/animal', require('./routes/animal'))
app.use('/api/admin', require('./routes/user'))


// create a port
const PORT = process.env.PORT || 5000
process.setMaxListeners(100)


const server = http.createServer(app)
server.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })
