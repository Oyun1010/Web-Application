const fs = require('fs');

export default  async function handler(req, res)  {
    const {regionSearch}  = req.query;
    console.log(regionSearch);

    fs.readFile("./data/wine-data-set.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.log("File read failed");
            return;
        }
        const key = "region_1";
        const data = JSON.parse(jsonString).filter(d => d[key] == regionSearch);
        res.status(200).json({data});
    });    
}