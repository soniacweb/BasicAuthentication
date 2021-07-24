const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("./db");

const app = express(); // app is a new instance of express

// we're telling express middleware to read json formatted body (of a request) and parse that/ latch it onto req as a body parameter. 
//(it cant read json otherwise)
app.use(express.json());

// bcrypt uses promises hence why we need an async function
app.post('/users', async (req, res) => {
    const { username, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10) // workfactor = 10. bcrupt stores that in the password
    // console.log(userName, password, hash);
    await User.create({ username, passwordHash }) // create is a static method (shared by all members of the class), creates a new user object in db using the stored values from the request body. its an await, because its a promise, waiting for it to store the new user in the db.

    res.sendStatus(201);
})

module.exports = app;
