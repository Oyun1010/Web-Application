const fs = require('fs');

export default function handler(req, res) {
     
    const {countrySearch} = req.query;
    console.log("query", countrySearch);

    fs.readFile("./data/wine-data-set.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.log("File read failed");
            return
        }
        const key = "country";
        // const data = JSON.parse(jsonString).filter((e) => e[key] === countrySearch);
        // const data = JSON.parse(jsonString);
        const data = JSON.parse(jsonString).filter(d => d[key] === countrySearch); 
        console.log(data);
        res.status(200).json({data});
       
    })
   
   
}