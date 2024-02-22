const express = require('express')
require('dotenv').config();


const connectToDb = require('./config/connectToDb')
const Note = require('./models/note')
const app = express()

app.use(express.json())

//connect to database
connectToDb()

app.get('/', (req, res) => {
    res.json({ hello: "world" })
})

app.post('/notes', async (req, res) => {
    //get the sent in data of request body
    const title = req.body.title;
    const body = req.body.body;

    //create a note  with it 
    const note = await Note.create({
        title: title,
        body: body
    });

    //respond with the new note 
    res.json({ note: note })
})

app.get('/notes', async (req, res) => {
    //find the note
    const notes = await Note.find();
    //respond with them 
    res.json({ notes: notes })
})

app.get('/notes/:id', async (req, res) => {
    //get id of the url
    const noteId = req.params.id;
    //find the note using that id 
    const note = await Note.findById(noteId);
    //respond with the note
    res.json({ note: note })

});

app.put('/notes/:id', async (req, res) => {
    //get the id of the url
    const noteId = req.params.id;
    //get the data of the req body
    const title = req.body.title;
    const body = req.body.body;
    //find and update the record
    const note = await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body
    });

    //respond with the note 
    res.json({ note: note })

})

app.delete('notes/:id', async (req, res) => {
    //get id of url
    const noteId = req.body.title
    //delete the record
    await Note.deleteOne({ id: noteId })
    //respond
    res.json({ success: "Record deleted" })
})
app.listen(process.env.PORT)