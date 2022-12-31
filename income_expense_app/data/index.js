const express = require('express');
const app = express;
const mongoose = require('mongoose');

const URI = "mongodb+srv://Oyu:99543988@cluster.34qkho7.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(URI, connectionParams)
    .then(() => {
        console.info("Connected to the Database");
    })
    .catch((e) => {
        console.log("Error: ", e);
    });

app.listen(5000, () => {
    console.log("Server is running on port 3000");
})
