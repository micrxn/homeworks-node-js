const fs = require("fs");
const path = require("path");


fs.writeFile("homework.txt", "Hello from our first Node homework", (err) =>{
    if(err){
        return console.log(err)
    }    
});

fs.appendFile("homework.txt", "\nFINISHED", (err) =>{
    if(err){
        return console.log(err)
    }
});

fs.readFile("homework.txt", (err, data) =>{
    if(err){
        return console.log(err)
    }
    console.log(data.toString())
});

fs.writeFileSync(
    path.join("homework1.txt"),
    "Hello from our first Node homework 1"
);

fs.appendFileSync(
    path.join("homework1.txt"),
    "\nFINISHED 1"
);

const readSync = fs.readFileSync(
    path.join("homework1.txt"),
        (err, data) => {
            if(err){
                return console.log(err)
            }
            console.log(data.toString())
        }
);
console.log(readSync.toString())
// console.log(readAsync)