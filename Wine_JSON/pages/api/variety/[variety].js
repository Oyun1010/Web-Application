const fs = require('fs');

export default async function handler(req, res) {
    const {variety} = req.query;
    console.log(variety);

    fs.readFile("./data/wine-data-set.json", 'utf-8', (err, jsonString) => {
        if(err) {
            console.log("File read filed");
            return;
        }
        const key = "variety";
        const data = JSON.parse(jsonString).filter(data => data[key] == variety);

        res.status(200).json({data});
    })

}