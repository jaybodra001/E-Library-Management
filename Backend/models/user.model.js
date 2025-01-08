import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  borrowedBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to Book model
  }],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export { User };
