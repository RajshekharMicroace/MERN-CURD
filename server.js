const express = require('express')
require('dotenv').config();


const connectToDb = require('./config/connectToDb')
const Note = require('./models/note')
const app = express()

app.use(express.json())

//connect to database
connectToDb()

app.get('/', (req, res) => {
    res.json({hello: "world"})
})

app.post('/notes', async(req, res)=>{
    //get the sent in data of request body
    const title = req.body.title;
    const body = req.body.body;

    //create a note  with it 
    const note =  await Note.create({
        title: title,
        body: body
    });

    //respond with the new note 
    res.json({note:note})
})
app.listen(process.env.PORT)