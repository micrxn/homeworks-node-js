const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    
    if(req.url === "/") {
        let user = JSON.parse(fs.readFileSync("./db.json"))
        console.log(user.users[0])
        let userName = JSON.stringify(user.users[0].name);
        let userLastName = JSON.stringify(user.users[0].lastName);
        let userAge = JSON.stringify(user.users[0].age);
        
        res.end(`
            ${userName} ${userLastName} Age:${userAge}
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
    };
    if(req.url === "/update" && req.method === "POST"){

        let chunks = []
        req.on("data", (chunk) =>{ 
            chunks.push(chunk);
        })
        req.on("end", ()=>{
            // console.log(chunks)
            let chunksToString = Buffer.concat(chunks).toString()
            console.log(chunksToString);
            let splitedData = chunksToString.split("&");
            // console.log(splitedData);
            let result = {}

            splitedData.forEach((data) => {
                let keyValueSplit = data.split("=");
                let key = keyValueSplit[0];
                let value = keyValueSplit[1];
                result[key] = value
                // console.log(result)

            });
            let newUser = {firstName: result.firstName, lastName: result.lastName, age: result.age, id:uuidv4()}
            console.log(newUser);
            let users = JSON.parse(fs.readFileSync("./db.json"));
            // console.log(users)
            users.users.push(newUser);
            // console.log(users)
            fs.writeFileSync("./db.json", JSON.stringify(users))
            // console.log(JSON.parse(fs.readFileSync("./db.json")));
            res.writeHead(200, {"Content-Type": "text/html"});
            let lastUser = users.users[users.users.length -1]
            return res.end(
                `
                Last User:
                ${lastUser.firstName} ${lastUser.lastName} ${lastUser.age}
                
                `
            )

        })

    }
    
})



server.listen(5000)