const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Contact = require('./model/contact')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))


mongoose.set('strictQuery', true)
mongoose.connect('mongodb://0.0.0.0:27017')

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Database Connected'))

app.post ('/contactus', async (req, res) => {
    const contact = await new Contact ({
        name : req.body.name,
        text : req.body.text
    })
    try {
        newContact = await contact.save()
        res.send("Successfully sent the Contact form")
    } catch(er){
        console.error(er)
    }
})
app.listen(process.env.PORT || 3000)