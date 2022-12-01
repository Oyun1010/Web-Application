import { count } from "console";

const fs = require("fs");
export default function handler(req, res) {
    
    if(req.method === "GET") {
        fs.readFile("./data/wine-data-set.json", 'utf-8', (err, jsonString) => {
            if(err) {
                console.log("File read filed:");
                return;
            }
            const key = "country";
            const country = [...new Set(JSON.parse(jsonString).map(data => data[key]))]
            // const data = JSON.parse(jsonString).filter(d => d[key] == value);           
            res.status(200).json({country});
          
        });
    }
}