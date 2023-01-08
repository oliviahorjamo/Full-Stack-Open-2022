require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

morgan.token('data', function(req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const number = persons.length
        const now = new Date()

        res.send(`<p>Phonebook has info for ${number} people
        <br>${now}<p>`)
    })
  })

app.get('/api/persons', (req, res) => {
    Person.find({})
    .then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    console.log('deletessä')
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
  })


app.put('/api/persons/:id', (req, res, next) => {
    console.log('putissa')
    const filter = {_id: req.params.id}
    const update = { number: req.body.number }
    Person.findOneAndUpdate(filter, update, {new:true}).then(updatedPerson => {
        res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    Person.find({}).then(persons => {
        const number = persons.length
        
        const names = persons.map(p => p.name)

        if (names.includes(body.name)) {
            return res.status(400).json({
                error: 'name already in the phonebook'
            })
        } else {
            newPerson = Person({
                name: body.name,
                number: body.number
            })
        
            newPerson.save().then(savedPerson => {
                res.json(savedPerson)
            })
        }
    })

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next(Error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})