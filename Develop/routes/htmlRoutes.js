//html routes

var path = require("path");

module.exports = function(app) {
    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/notes.html"));
      });
    
      app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });
    };