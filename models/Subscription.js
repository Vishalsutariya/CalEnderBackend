// models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    ongoing: { type: Boolean, default: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, default: 'monthly' },
});
  

module.exports = mongoose.model('Subscription', SubscriptionSchema);
