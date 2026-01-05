module.exports = {
  taxRate: 0.06, // 6% for SC
  shippingTiers: [
    { min: 0, max: 49.99, price: 12.99 },
    { min: 50.00, max: 99.99, price: 8.99 },
    { min: 100.00, max: 9999999, price: 0.00 }
  ]
};
