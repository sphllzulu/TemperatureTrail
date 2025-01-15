
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{
    destination: { type: String, required: true },
    name: { type: String, required: true },
  }],
  searchHistory: [{
    destination: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    weather: {
      temperature: Number,
      humidity: Number,
      conditions: String,
      icon: String,
      lat: Number,
      lon: Number
    }
  }],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);