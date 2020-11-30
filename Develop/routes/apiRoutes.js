//api routes
const fs = require("fs");
const express = require("express");
const path = require("path");
const shortid = require('shortid');
const noteData = require("../db/db.json");

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile("db/db.json", function (error, data) {
            let allNotes = JSON.parse(data);
            return res.json(allNotes);
        })
    });

    app.post("/api/notes", (req, res) => {
        fs.readFile("db/db.json", function (err, data) {
          if (err) {
            throw err;
          }
      // Variable for New Notes Parsed with Layout
          let allNotes = JSON.parse(data);
          let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: shortid.generate(),
          };
      // Push New Notes to Write New File
          allNotes.push(newNote);
          fs.writeFile(
            "db/db.json",
            JSON.stringify(allNotes, null, 2),
            (err) => {
              if (err) {
      // Error Comment if Function is Null
              throw err;
              }
              res.send("200");
            }
          );
        });
      });

    // app.post("/api/notes", function (req, res) {

    //     noteData.push(req.body)
    //     res.json(noteData)
    //     fs.writeFile("db/db.json", JSON.stringify(noteData), function (err, log) {
    //         // if (err) {
    //         //     throw err
    //         // } else {
    //         //     res.json(true)
    //         // }
    //     })
    // });

    app.delete("/api/notes/:id", function (req, res) {
        const deleteNote = noteData.filter(notes => notes.id !== req.params.id);
        fs.writeFile("db/db.json", JSON.stringify(deleteNote), function (err, log) {
            // if (err) {
            //     throw err
            // } else {
            //     res.json(true)
            // }

            console.log(deleteNote)
        })
    });
}
