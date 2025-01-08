import mongoose from 'mongoose';

// Book Schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  isBorrowed: {
    type: Boolean,
    default: false,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    default: null,
  },
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

export { Book };
