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
      // parse data into new object for display
          let theseNotes = JSON.parse(data);
          let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: shortid.generate(),
          };
      // Add notes to db, display notes
          theseNotes.push(newNote);
          fs.writeFile("db/db.json", JSON.stringify(theseNotes, null, 2), (err) => {
              if (err) {
              throw err;
              }
              res.send("200");
            }
          );
        });
      });

      app.delete("/api/notes/:id", (req, res) => {
        let toDelete = req.params.id;
        fs.readFile("db/db.json", function (err, data) {
          if (err) throw err;
          let allNotes = JSON.parse(data);
          // Note Search by ID with Loop Information
          function searchChosen(toDelete, allNotes) {
            for (var i = 0; i < allNotes.length; i++) {
              if (allNotes[i].id === toDelete) {
                allNotes.splice(i, 1);
              }
            }
          }
          searchChosen(toDelete, allNotes);
          // Select and Write Update with 200 Approval
          fs.writeFile("db/db.json", JSON.stringify(allNotes, null, 2), (err) => {
              if (err) throw err;
              res.send("200");
            }
          );
        });
      });
}
