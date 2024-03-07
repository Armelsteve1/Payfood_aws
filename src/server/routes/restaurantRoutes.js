const express = require('express');
const router = express.Router();
const Restaurant = require('../schemas/restaurant');

router.get('/restaurants-data', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
