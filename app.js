const express = require('express');
const app = express();
  
app.set("view engine", "ejs");
app.use(express.static("public"));
  
app.get("/", function(req, res) {
    res.send("Welcome to chat app!");
});
  
server = app.listen(9000);