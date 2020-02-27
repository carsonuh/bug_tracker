const Bug = require('./Bug');
const User = require('./User');

/* Demonstrates a simple implementation of standard CRUD operations */
class BugController {

    index(req, res) {
        let bugs = Bug.all();
        let user = User.all();
        res.render('bug/bugIndex', { bugs: bugs, User });
    }

    show(req, res) {
        let user = User.all();
        let id = req.params.id;
        let bug = Bug.find(id);

        if (!bug) {
            res.send("Could not find bug with id of " + id);
        } else {
            res.render('bug/bugShow', { bug: bug, User });
        }
    }

    newBug(req, res) {
        let user = User.all();
        res.render('bug/bugNew', { bug: new Bug(), user: user });
    }

    create(req, res) {
        console.log("About to create bug");
        console.log(req.body);
        let user = User.all();
        let newBug = Bug.create(req.body.bug);


        if (newBug.isValid()) {
            // Send a redirect to the "show" route for the new bug.
            res.writeHead(302, { 'Location': `/bugs/${newBug.id}` });
            res.end();
        } else {
            newBug.id = undefined;
            res.render('bug/bugNew', { bug: newBug, user: user });
        }
    }

    edit(req, res) {
        let user = User.all();
        let id = req.params.id;
        let bug = Bug.find(id);

        if (!bug) {
            res.send("Could not find bug with id of " + id);
        } else {
            res.render('bug/bugEdit', { bug: bug, user: user  } );
        }
    }

    delete(req, res) {
        let id = req.params.id;
        let bug = Bug.find(id);

        if (!bug) {
            res.send("Could not find bug with id of " + id);
        } else {
          Bug.delete(id);
          res.writeHead(302, { 'Location': `/bugs` });
          res.end();
        }
    }

    update(req, res) {
        let id = req.params.id;
        let bug = Bug.find(id);

        let testBug = new Bug(req.body.bug);
        if (!testBug.isValid()) {
            testBug.id = bug.id;
            res.render('bug/bugEdit', { bug: testBug });
            return;
        }

        if (!bug) {
            res.send("Could not find bug with id of " + id);
        } else {
            bug.title = req.body.bug.title;
            bug.description = req.body.bug.description;
            bug.issue_type = req.body.bug.issue_type;
            bug.priority = req.body.bug.priority;
            bug.status = req.body.bug.status;
            bug.userId = req.body.bug.userId;
            // If using a database, we would need some kind of "save" method here.

            // Send a redirect to the "show" route for the new bug.
            res.writeHead(302, { 'Location': `/bugs/${bug.id}` });
            res.end();
        }
    }
}

module.exports = BugController;
