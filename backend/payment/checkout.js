const Stripe = require("stripe");
const express = require('express');
const router = express.Router();
const stripe = Stripe(process.env.stripe_key);

router.post('/create-payment-intent', async (req, res) => {
    try {
      // Create a Payment Intent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: "eur",
        payment_method_types: ['card'],
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(400).send({
        error: {
          message: error.message,
        },
      });
    }
  });
module.exports = router;
  