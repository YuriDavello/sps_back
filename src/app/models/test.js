const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
  message: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tests', testSchema);