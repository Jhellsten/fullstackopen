const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Martti Tienari', number: '040-123456', id: 2 },
    { name: 'Arto Järvinen', number: '040-123456', id: 3 },
    { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
  ]

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :body - :status :res[content-length] - :response-time'))

app.get('/api/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  })
app.get('/api/info', (request, response) => {
  const date = new Date(Date.now()).toUTCString()
    response.send(`Puhelinluettelossa on ${persons.length} henkilön tiedot
    
    ${date}
    `)
  })
app.post('/api/persons', (request, response) => {
  const body = request.body
  const id = Math.floor(Math.random() * Math.floor(1000))
  // console.log(id)

  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }
  if (body.number === undefined) {
    return response.status(400).json({error: 'number missing'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id
  }
  // if(persons.filter(person => person.name === body.name)) {
  //   throw new Error('name must be unique')
  // }
  // if(persons.filter(person => person.number === body.number).length > 0) {
  //   throw new Error('number must be unique')
  // }

  persons = persons.concat(person)

  response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(person => person.id === id)
  if ( person ) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
  })

app.get('*', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})