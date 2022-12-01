const fs = require("fs");

export default async function handler(req, res) {
    // res.status(200).json({data})
    console.log("query", req.query);
    if(req.method === 'GET') {
      fs.readFile("./data/wine-data-set.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        const data = JSON.parse(jsonString);
        res.status(200).json({data});    
      });
    }
}
  
