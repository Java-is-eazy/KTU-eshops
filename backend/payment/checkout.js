const Stripe = require("stripe");
const express = require('express');
const router = express.Router();
const stripe = Stripe(process.env.stripe_key);
const path = require("path");
const fs = require("fs");
router.post('/create-payment-intent', async (req, res) => {
  const filePath = path.join(__dirname, "../items-placeholder.json");
  let itemPrice = 0;
  try {
    const { payment_method, productId} = req.body; 
    
    
    const data = await fs.promises.readFile(filePath, 'utf8');
    const items = JSON.parse(data);

    // Find the item by productId
    const selectedItem = items.find(item => item.id == Number.parseInt(productId));
    
    if (!selectedItem) {
      res.status(400).send("Invalid product ID");
      return;
    }
    itemPrice = selectedItem.price * 100;
    // Create a Payment Intent with the calculated amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: itemPrice,
      currency: "eur",
      payment_method_data: payment_method,
    });
    console.log("backend payment intent: ",paymentIntent)
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
        amount: 9000,
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
  