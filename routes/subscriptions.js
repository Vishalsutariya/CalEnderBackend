// routes/subscriptions.js
const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}
  
// Apply isAuthenticated middleware to all routes
router.use(isAuthenticated);

// GET: Fetch subscriptions based on the month
router.get('/', async (req, res) => {
    const { year, month } = req.query;
    let query = { user: req.user.id };
  
    try {
      const subscriptions = await Subscription.find(query);
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// POST: Create a new subscription
router.post('/', async (req, res) => {
    const subscription = new Subscription({
      ...req.body,
      user: req.user.id,
    });
  
    try {
      const newSubscription = await subscription.save();
      res.status(201).json(newSubscription);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// PUT: Edit a subscription
router.put('/:id', getSubscription, async (req, res) => {
  Object.assign(res.subscription, req.body);
  try {
    const updatedSubscription = await res.subscription.save();
    res.json(updatedSubscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a subscription
router.delete('/:id', getSubscription, async (req, res) => {
    try {
      await res.subscription.deleteOne();
      res.json({ message: 'Subscription deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Middleware to get subscription by ID
async function getSubscription(req, res, next) {
  let subscription;
  try {
    subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscription = subscription;
  next();
}

module.exports = router;
