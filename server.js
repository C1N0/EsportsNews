// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Application
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/teams", (req, res) => {
    const teamsList = readJSONFile();
    const newTeam = req.body;
    newTeam.id = uuid.v4();
    teamsList.push(newTeam);
    writeJSONFile(teamsList);
    res.status(200).send(newTeam);
  });


// Read One by Name
app.get("/teams/:name", (req, res) => {
    const teamsList = readJSONFile();
    const name = req.params.name;
    const foundTeam = teamsList.find(team => team.name === name);
    if (foundTeam) {
      res.status(200).send(foundTeam);
    } else {
      res.status(204).send('No team found!');
    }
  });
  



// Read All
app.get("/teams", (req, res) => {
  const teamsList = readJSONFile();
  if (teamsList && teamsList.length > 0) {
    res.status(200).send(teamsList);
  } else {
    res.status(204).send('No teams found!');
  }
});

// Update
app.put("/teams/:name", (req, res) => {
    const teamsList = readJSONFile();
    const name = req.params.name;
    const update = req.body;
    let updatedTeam = null;
    for (let i = 0; i < teamsList.length; i++) {
      if (teamsList[i].name === name) {
        if (update.name) {
          teamsList[i].name = update.name;
        }
        if (update.game) {
          teamsList[i].game = update.game;
        }
        if (update.country) {
          teamsList[i].country = update.country;
        }
        if (update.players) {
          teamsList[i].players = update.players;
        }
        updatedTeam = teamsList[i];
        break;
      }
    }
    writeJSONFile(teamsList);
    if (updatedTeam) {
      res.status(200).send(updatedTeam);
    } else {
      res.status(204).send('No team found!');
    }
  });
  

// Delete
app.delete("/teams/:name", (req, res) => {
    const teamsList = readJSONFile();
    const name = req.params.name;
    const teamIndex = teamsList.findIndex(team => team.name === name);
    if (teamIndex !== -1) {
      teamsList.splice(teamIndex, 1);
      writeJSONFile(teamsList);
      res.status(200).send('Team deleted!');
    } else {
      res.status(204).send('No team found!');
    }
  });
  

// Reading function from db.json file
function readJSONFile() {
  const content = fs.readFileSync("db.json", "utf8");
  return JSON.parse(content).teams;
}

// Writing function to db.json file
function writeJSONFile(content) {
  const data = { teams: content };
  fs.writeFileSync("db.json", JSON.stringify(data, null, 4), "utf8", err => {
    if (err) {
      console.log(err);
    }
  });
}

// Starting the server
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
