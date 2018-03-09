
// Express Stuff
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Create the knex connection. This is used by bookshelf
// in order to talk to our Postgres database. Replace
// connection variables with your details
const knex = require('knex')({
    client: 'pg',
    connection: {
      database: 'todos',
      user:     'moon',
      password: ''
  }
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect bookshelf. Requiring bookshelf returns a function,
// so we call that function with the knex object that we
// got above. This syntax is similar to chaining functions.
// require('bookshelf') returns a function, and then we call
// that returned function by using parenthesis and passing
// appropriate parameters, .e.g (knex)
const bookshelf = require('bookshelf')(knex)

// CREATING MODELS
// Models are the key to Bookshelf. Models are representations
// of the schemas that we created using Knex migrations. We
// have to create a model for every table that we want to 
// work with

//Author model
const Todos = bookshelf.Model.extend({
  tableName: 'todos',      
})

const newTodos = new Todos({
 
 value: String,
 done: Boolean
  // value: req.body.newTodo.value,
    // done: req.body.newTodo.done
})

app.get('/', (req, res) => {
  // Use a todos model to fetchAll of the todos
  Todos.fetchAll()
    .then(results => {
      // console.log(results)
      const todos = results.models.map(todo => {
        return todo.attributes
      })
      res.json(todos)
    })
})

app.post('/', (req, res) => {
  let todo = new Todos({  
    value: req.body.newTodo.value,
    done: req.body.newTodo.done
  }).save()
    .then(todo => {
      Todos.fetchAll()
      .then(results => {
        const todos = results.models.map(todo => {
          return todo.attributes
        })
        res.json(todos)
      })

  })
 
})
app.post('/update', (req, res) => {
  const todoItemUpdate = {
    value: req.body.value,
    done: req.body.done
  }
  new Todos({id:req.body.id})
  .save(todoItemUpdate, {patch: true})
  .then(todos => {
    console.log(todos.attributes)
  })
})

app.post('/delete', (req, res) => {
  Todos.where({done:true})
    .destroy()
    .then(todo => {
      Todos.fetchAll()
      .then(results => {
        const todos = results.models.map(todo => {
          return todo.attributes
        })
        res.json(todos)
      })
})
})







app.listen(8080)