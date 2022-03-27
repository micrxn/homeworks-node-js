const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res, next) => {
    let users = JSON.parse(fs.readFileSync("./db.json"))
    // console.log(users)
    let lastUser = users.users[0]
    console.log(lastUser);
    res.send(`
    ${lastUser.name + " " + lastUser.lastName + " " + lastUser.age}
    <form method="POST" action="/update" name="addUser">
            <fieldset>
                <div>
                    <label for="firstName">First name:</label>
                    <input type="text" id="firstName" name="firstName" required placeholder="Enter your first name">
                </div>
                <div>
                    <label for="lastName">Last name:</label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Enter your last name">
                </div>
                <div>
                    <label for="age">Age:</label>
                    <input type="text" id="age" name="age" required placeholder="Enter your age">
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </fieldset    
     </form>
    `)
});


app.post("/update", (req, res, next) => {
    let users = JSON.parse(fs.readFileSync("./db.json"))
    console.log(users)
    // console.log(req)
    let newUser = {firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, id: uuidv4()}
    // console.log(newUser)
    users.users.push(newUser)
    fs.writeFileSync("./db.json", JSON.stringify(users))
    // console.log(users)
    lastUser = users.users[users.users.length -1]
    console.log(lastUser);
    res.send(`
        ${lastUser.firstName + " " + lastUser.lastName + " " + lastUser.age}
    `)
})
const PORT = process.env.PORT || 5000

app.listen(PORT)