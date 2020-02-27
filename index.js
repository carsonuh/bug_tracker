
/* Import the express npm module */
const express = require('express');

const BugController = require('./BugController');
const bugController = new BugController();

const UserController = require('./UserController');
const userController = new UserController();

/* Import the body-parser module.  (Used for parsing Post data) */
const bodyParser = require('body-parser');

/* Instantiate a server object*/
const app = express()
const port = 3000


/* Tell the server to use EJS by default */
app.set('view engine', 'ejs');


/* Parse the request body if there is POST data */
app.use(bodyParser.urlencoded({ extended: true }));

/****************************************
 *                BUGS                  *
 ****************************************/

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

/* Delete bug */
app.get('/bugs/:id/delete', (req, res) => {
    bugController.delete(req, res);
});

/* Update a bug */
app.post('/bugs/:id', (req, res) => {
    bugController.update(req, res);
});

/****************************************
 *                USERS                 *
 ****************************************/

/* Display all users */
app.get('/users', (req, res) => {
    userController.index(req, res);
});

/* Create a new user */
app.post('/users', (req, res) => {
    userController.create(req, res);
});

/* Display a form to create a new user */
app.get('/users/new', (req, res) => {
    userController.newUser(req, res);
});


/* Display details for one user.
   :id represents a "route parameter" */
app.get('/users/:id', (req, res) => {
    userController.show(req, res);
});

/* Edit a user */
app.get('/users/:id/edit', (req, res) => {
    userController.edit(req, res);
});

/* Delete user */
app.get('/users/:id/delete', (req, res) => {
    userController.delete(req, res);
});

/* Update a user */
app.post('/users/:id', (req, res) => {
    userController.update(req, res);
});

/* Launch the server */
app.listen(port, () => console.log(`App listening on port ${port}!`))
