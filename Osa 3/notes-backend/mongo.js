/// note that is is a practice application for mongodb


/// mongodb XeTDyMNL48DChKA0

const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('provide the password as an argoment node mongo.js <password>')
    process.exit() /// close the program
}

const password = process.argv[2]

const url = `mongodb+srv://oliviahorj:${password}@cluster0.lqldjpl.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then((result) => {
        Note.find({}).then(result => {
            result.forEach(note => {
                console.log(note)
            })
            mongoose.connection.close()
        })
        /*
        const note = new Note({
            content: 'HTML is easy',
            date: new Date(),
            important: true,
        })
        return note.save()
    })
    .then(() => {
        console.log('note saved')
        return mongoose.connection.close()
        */
    })
    .catch((err) => console.log(err))
