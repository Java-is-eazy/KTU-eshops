const {
  getItems,
  getUserByUsername,
  createUser,
  deleteUser,
  reportUser,
  createItem,
  getUserByEmail,
  changePassword,
  createPasswordRecoveryRequest,
  getListingByID,
  deleteListing,
} = require("../database/controller");

const { sendEmail } = require("../mail/mailer");

const {
  register,
  tryLogin,
  generateRandomString,
} = require("../authentication/authentication");
const { hashPassword } = require("../authentication/hashing");

const path = require("path");
const fs = require("fs");
const { verifyToken } = require("../authentication/token");
const e = require("express");
const { get } = require("http");

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
    try {
      const items = await getItems();

      if (req.query.itemid) {
        const itemId = req.query.itemid;
        const item = items.find((item) => item.id.toString() === itemId);

        if (!item) {
          res.status(404).send("Item not found");
          return;
        }

        res.json(item);
      } else {
        res.json(items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).send("Error fetching items");
    }
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

  app.delete("/listing/:id", async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send("Please provide an id");
        return;
      }
      const listing = await getListingByID(id);
      if (!listing) {
        res.status(404).send("Listing not found");
        return;
      }
      const token = req.headers.authorization;
      if (!token) {
        res.status(403).send("JWT must be provided");
        return;
      }
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        res.status(403).send("Invalid JWT");
        return;
      }
      if(decodedToken !== "admin")
      {
        res.status(403).send("Not admin");
        return;
      }
      await deleteListing(id);
      res.status(200).send("Listing deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/report", async (req, res) => {
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
      }
      const { reason } = req.body;
      if (!reason) {
        res.status(400).send("Please provide a reason");
        return;
      }
      await reportUser(decodedToken.id, user.id, reason);
      res.status(200).send("User reported successfully");
    } catch (error) {
      res.status(500).send("Internal server error while reporting a user");
    }
  });

  app.post("/items", async (req, res) => {
    try {
      const decodedToken = verifyToken(req.headers.authorization);
      if (decodedToken === false) {
        res.status(403).send("Unauthorized");
        return;
      }
      const { title, price, description, city, image } = req.body;
      if (!title || !price || !description || !city || !image) {
        res.status(400).send("Please fill in all fields");
        return;
      }
      await createItem(decodedToken.id, title, price, description, image);
      res.status(200).send("Item added successfully");
    } catch (error) {
      res.status(500).send("Internal server error while adding an item");
    }
  });

  app.post("/passwordrecovery", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await getUserByEmail(email);
      const string = await generateRandomString(32);
      createPasswordRecoveryRequest(user.id, string);

      sendEmail(email, "http://localhost:3000/recoverpassword/" + string);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      res.status(500).send("Internal server error");
      console.log(error);
    }
  });

  app.post("/recover", async (req, res) => {
    const { email, password, string } = req.body;
    if (!email || !password || !string) {
      res.status(400).send("Please fill in all fields");
      return;
    }
    try {
      const user = await getUserByEmail(email);
      const hashedPassword = hashPassword(user.username, password);
      changePassword(string, email, hashedPassword);
      res.status(200).send("Password changed successfully");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });
};

module.exports = { setupExpress };
