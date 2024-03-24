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
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).send("Please fill in all fields");
        return;
      }
      const user = await tryLogin(username, password);
      const userJson = JSON.stringify(user, username);
      res.status(200).send(userJson);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  app.post("/register", (req, res) => {
    try {
      const { username, password, email, phone } = req.body;
      if (!username || !password || !email || !phone) {
        res.status(400).send("Please fill in all fields");
        return;
      }
      register(username, password, email, phone);
      res.status(200).send("Success");
    } catch (error) {
      res.status(400).send(error.message);
      return;
    }
  });
  app.get("/items", (req, res) => {
    const filePath = path.join(__dirname, "../items-placeholder.json");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading the JSON file");
        return;
      }
      const items = JSON.parse(data);

      if (req.query.itemid) {
        const itemId = req.query.itemid;
        const item = items.find((item) => item.id.toString() === itemId);

        if (!item) {
          res.status(500).send("Item not found");
          return;
        }

        res.json(item);
      } else {
        res.json(items);
      }
    });
  });
};

module.exports = { setupExpress };
