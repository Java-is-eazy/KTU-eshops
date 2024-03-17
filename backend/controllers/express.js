const {
  getItems,
  getUserByUsername,
  createUser,
} = require("../database/controller");
const { register, tryLogin } = require("../authentication/authentication");

const path = require("path");
const fs = require("fs");

const setupExpress = (app) => {
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("Please fill in all fields");
      return;
    }
    try {
      const user = await tryLogin(username, password);
      console.log(user);

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("Please fill in all fields");
      return;
    }
    res.status(200).send("Success");
  });
  app.get("/items", (req, res) => {
    const filePath = path.join(__dirname, "../items-placeholder.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading the JSON file");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
};

module.exports = { setupExpress };
