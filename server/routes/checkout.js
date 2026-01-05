const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const config = require('../config/config');

function cents(n) { return Math.round(n * 100); }

function calculateShipping(subtotal) {
  const tiers = config.shippingTiers;
  for (let t of tiers) {
    if (subtotal >= t.min && subtotal <= t.max) return t.price;
  }
  return tiers[tiers.length - 1].price;
}

router.post('/calculate-order', (req, res) => {
  const { items, shippingState } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid items' });

  let subtotal = 0;
  for (const it of items) {
    const price = Number(it.price) || 0;
    const qty = Number(it.quantity) || 1;
    subtotal += price * qty;
  }

  const shipping = calculateShipping(subtotal);
  const tax = (shippingState && shippingState.toUpperCase() === 'SC') ? +(subtotal * config.taxRate).toFixed(2) : 0;
  const total = +(subtotal + shipping + tax).toFixed(2);

  res.json({ subtotal: +subtotal.toFixed(2), shipping, tax, total });
});

router.post('/create-checkout-session', async (req, res) => {
  const { items, shippingState } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid items' });

  // Recompute amounts server-side to ensure integrity
  let subtotal = 0;
  const line_items = [];
  for (const it of items) {
    const price = Number(it.price) || 0;
    const qty = Number(it.quantity) || 1;
    subtotal += price * qty;
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: it.name },
        unit_amount: cents(price),
      },
      quantity: qty,
    });
  }

  const shipping = calculateShipping(subtotal);
  const tax = (shippingState && shippingState.toUpperCase() === 'SC') ? +(subtotal * config.taxRate).toFixed(2) : 0;

  // Add shipping as a line item
  if (shipping > 0) {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Shipping' },
        unit_amount: cents(shipping),
      },
      quantity: 1,
    });
  }

  // Add tax as a line item when applicable
  if (tax > 0) {
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Sales Tax (SC)' },
        unit_amount: cents(tax),
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: req.body.success_url || `${req.protocol}://${req.get('host')}/success.html`,
      cancel_url: req.body.cancel_url || `${req.protocol}://${req.get('host')}/cart.html`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

module.exports = router;
