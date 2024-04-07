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
        payment_method_types: ['card', 'paypal'],
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
  router.post('/create-paypal-payment', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000, // Amount in cents
        currency: "eur",
        payment_method_types: ['paypal'],
        payment_method_options: {
            paypal: {
                description: "Your order description goes here",
            },
        },
      });

      // Retrieve the PayPal redirect URL from the Payment Intent
      const paypalUrl = paymentIntent.next_action.redirect_to_url.url;

      res.send({
          paypalUrl: paypalUrl,
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
  