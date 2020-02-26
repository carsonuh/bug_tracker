
/* Import the express npm module */
const express = require('express')


const BugController = require('./BugController');
const bugController = new BugController();

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));



/* Display all bugs */
app.get('/bugs', (req, res) => {
    bugController.index(req, res);
});

/* Create a new bug */
app.post('/bugs', (req, res) => {
    bugController.create(req, res);
});

/* Display a form to create a new bug */
app.get('/bugs/new', (req, res) => {
    bugController.newBug(req, res);
});


/* Display details for one bug.
   :id represents a "route parameter" */
app.get('/bugs/:id', (req, res) => {
    bugController.show(req, res);
});

/* Edit a bug */
app.get('/bugs/:id/edit', (req, res) => {
    bugController.edit(req, res);
});

app.get('/bugs/:id/delete', (req, res) => {
    bugController.delete(req, res);
});

/* Update a bug */
app.post('/bugs/:id', (req, res) => {
    bugController.update(req, res);
});

/* Launch the server */
app.listen(port, () => console.log(`App listening on port ${port}!`))
