const Stripe = require("stripe");
const express = require('express');
const router = express.Router();
const stripe = Stripe(process.env.stripe_key);
const path = require("path");
const fs = require("fs");

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { paymentMethod, productIds, formData } = req.body;
    const items = await getItems();
    const totalPrice = await calculateTotalPrice(productIds, items);
    const paymentIntent = await createPaymentIntent(totalPrice, paymentMethod, formData);

    console.log("backend payment intent: ", paymentIntent);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error processing payment intent: ", error);
    res.status(400).send({ error: { message: error.message } });
  }
});
async function getItems() {
  const filePath = path.join(__dirname, "../items-placeholder.json");
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Helper to calculate total price
async function calculateTotalPrice(productIds, items) {
  let totalPrice = 0;
  for (const productId of productIds) {
    const selectedItem = items.find(item => item.id == Number.parseInt(productId));
    if (!selectedItem) {
      throw new Error(`Invalid product ID: ${productId}`);
    }
    totalPrice += selectedItem.price * 100;  // Assuming price needs to be converted to cents
  }
  return totalPrice;
}

async function createPaymentIntent(totalPrice, paymentMethod, formData) {
  return await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: "eur",
    payment_method: paymentMethod.id, // Use this to attach an existing payment method ID
    metadata: {  // Including form data as metadata
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode
    }
  });
}

module.exports = router;
  