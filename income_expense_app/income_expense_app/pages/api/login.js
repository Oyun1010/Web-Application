const fs = require('fs');

export default function handler(req ,res) {

    const data = fs.readFile("../data/login.js", (err, jsonString) => {
        if(err) {
            console.log("Failed read file");
        }
    })
    res.status(200).json({ name: 'John Doe' })
}