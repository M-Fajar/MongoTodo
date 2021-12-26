const express = require('express')
const cors = require('cors')
const req = require('express/lib/request')
const res = require('express/lib/response')

const app = express()

app.use(cors([
    {origin:"http://localhost:8081"},
    {origin:"http://localhost:8080"}]))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const db = require('./app/models/')
db.mongoose
    .connect(db.url,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        
        
    })
    .then(()=>{
        console.log('Database Connected')
    }).catch((err)=>{
        console.log(`Cannot connect to the Database`, err)
        process.exit()
    })


app.get('/', (req,res) => {
    res.json({
        message: "Welcome Fajar to ExpresJS"
    })
})

require('./app/routes/task.routes')(app)

const PORT = 9000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})