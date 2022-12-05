const fs = require('fs');

export default function handler(req, res) {

    fs.readFile("./data/wine-data-set.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.log("File read failed");
            return;
        }
        const key = "variety";
        const variety = [...new Set(JSON.parse(jsonString).map(data => data[key]))];
        res.status(200).json({variety});
    })
}