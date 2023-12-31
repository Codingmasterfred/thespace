const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  message_content: String,
  timestamp: Date,
  // Other relevant message fields here
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;