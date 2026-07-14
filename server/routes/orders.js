const router = require('express').Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    console.log('Order received:', req.body);
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    console.log('Order error:', err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;