// MongoDB model (Model.js)
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/file_upload', {
  useUnifiedTopology: true,
});

// Define the schema
const userSchema = new mongoose.Schema({
  files: [
    {
      originalName: String,
      path: String,
    },
  ],
  // Add other user-related properties as needed
});

// Create a model based on the schema
module.exports = mongoose.model('User', userSchema);