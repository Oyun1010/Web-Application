const fs = require('fs');

export default function handler(req, res) {
    const {nameSearch} = req.query;
    console.log(nameSearch);

    fs.readFile("./data/wine-data-set.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.log("File read failed");
            return;
        }
        const key = "taster_name";

        const data = JSON.parse(jsonString).filter(data => data[key] == nameSearch);
        res.status(200).json({data});
    })
}