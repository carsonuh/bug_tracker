const User = require('./User');

/* Demonstrates a simple implementation of standard CRUD operations */
class UserController {

    index(req, res) {
        let users = User.all();
        res.render('user/userIndex', { users: users });
    }

    show(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        if (!user) {
            res.send("Could not find user with id of " + id);
        } else {
            res.render('user/userShow', { user: user });
        }
    }

    newUser(req, res) {
        res.render('user/userNew', { user: new User() });
    }

    create(req, res) {
        console.log("About to create user");
        console.log(req.body);
        let newUser = User.create(req.body.user);


        if (newUser.isValid()) {
            // Send a redirect to the "show" route for the new user.
            res.writeHead(302, { 'Location': `/users/${newUser.id}` });
            res.end();
        } else {
            newUser.id = undefined;
            res.render('user/userNew', { user: newUser });
        }
    }

    edit(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        if (!user) {
            res.send("Could not find user with id of " + id);
        } else {
            res.render('user/userEdit', { user: user });
        }
    }

    delete(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        if (!user) {
            res.send("Could not find user with id of " + id);
        } else {
          User.delete(id);
          res.writeHead(302, { 'Location': `/users` });
          res.end();
        }
    }

    update(req, res) {
        let id = req.params.id;
        let user = User.find(id);

        let testUser = new User(req.body.user);
        if (!testUser.isValid()) {
            testUser.id = user.id;
            res.render('user/userEdit', { user: testUser });
            return;
        }

        if (!user) {
            res.send("Could not find user with id of " + id);
        } else {
            user.lname = req.body.user.lname;
            user.fname = req.body.user.fname;
            user.email = req.body.user.email;
            user.pic = req.body.user.pic;
            // If using a database, we would need some kind of "save" method here.

            // Send a redirect to the "show" route for the new user.
            res.writeHead(302, { 'Location': `/users/${user.id}` });
            res.end();
        }
    }
}

module.exports = UserController;
