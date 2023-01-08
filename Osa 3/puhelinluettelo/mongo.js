/// Exercise 3.12
/// If a name and phone number are given, add the person to the database
/// If only password is given, list all people

const mongoose = require('mongoose')
var listPeople = false

const password = process.argv[2]
const url = `mongodb+srv://oliviahorj:${password}@cluster0.lqldjpl.mongodb.net/phoneBook?retryWrites=true&w=majority`

if (process.argv.length < 4) {
    listPeople = true
} else {
    var newName = process.argv[3]
    var newNumber = process.argv[4]
    console.log(newName)
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (listPeople === true) {
    mongoose.connect(url)
    .then((result) => {
        Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
    })
    .catch((err) => console.log(err))
} else {
    mongoose.connect(url)
    .then((result) => {

        const person = new Person({
            name: newName,
            number: newNumber,
        })
        return person.save()
    })
    .then(() => {
        console.log(`added ${newName} to the phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}