const express = require("express");
const cors = require("cors");
const { setupExpress } = require("./controllers/express");
const checkoutRoute = require('./payment/checkout');
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
};
const PORT = 3001;
const setup = () => {
  const app = express();
  // app.use(cors(corsOptions));
  app.use(cors()); // disabled cors, as it doesn't allow testing on mobile. Enable on prod version
  app.use(express.json());
  setupExpress(app);
  app.use('/api/checkout', checkoutRoute);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

setup();
