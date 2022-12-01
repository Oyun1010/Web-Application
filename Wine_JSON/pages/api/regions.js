const fs = require('fs');
export default function handler(req, res) {
    if(req.method === "POST") {
        fs.readFile("./data/wine-data-set.json", 'utf-8', (err, jsonString) => {
            if(err) {
                console.log("File read failed", err);
                return;
            }
            const key = "region_1";
            const regions = [...new Set(JSON.parse(jsonString).map(data => data[key]))]
            res.status(200).json({regions});
        } )
    }
}