//api routes
const fs = require("fs");

var noteData = require("../db/db.json");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {

        noteData.push(req.body)
        res.json(noteData)
        fs.writeFile("db/db.json", JSON.stringify(noteData), function (err, log) {
            // if (err) {
            //     throw err
            // } else {
            //     res.json(true)
            // }
        })
    });

    app.delete("/api/notes/:id", function (req, res) {
        const deleteNote = noteData.filter(notes => notes.id !== req.params.id);
        fs.writeFile("db/db.json", JSON.stringify(deleteNote), function (err, log) {
            // if (err) {
            //     throw err
            // } else {
            //     res.json(true)
            // }
        })

    })

}