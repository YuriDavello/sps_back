const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  repos: [{
      type: Object
  }]
});

userSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
})

module.exports = mongoose.model('users', userSchema);