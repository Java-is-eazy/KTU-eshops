const {
  getItems,
  getUserByUsername,
  createUser,
  deleteUser,
} = require("../database/controller");
const { register, tryLogin } = require("../authentication/authentication");

const path = require("path");
const fs = require("fs");
const { verifyToken } = require("../authentication/token");

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

  app.post("/register", async (req, res) => {
    try {
      const { username, password, email, phone } = req.body;
      if (!username || !password || !email || !phone) {
        res.status(400).send("Please fill in all fields");
        return;
      }
      await register(username, password, email, phone);
      res.status(200).send("Success");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.get("/items", async (req, res) => {
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
  app.get("/user", async (req, res) => {
    try {
      const { username } = req.query;
      if (!username) {
        res.status(400).send("Please provide a username");
        return;
      }
      const data = await getUserByUsername(username);
      if (!data) {
        res.status(404).send("User not found");
        return;
      }
      const user = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        created_at: data.created_at,
      };
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.delete("/user", async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        res.status(400).send("Please provide a username");
        return;
      }
      const user = await getUserByUsername(username);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      const decodedToken = verifyToken(req.headers.authorization);
      if (decodedToken === false) {
        res.status(403).send("Unauthorized");
        return;
      } else {
        await deleteUser(username);
        res.status(200).send("User deleted successfully");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};

module.exports = { setupExpress };
