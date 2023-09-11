import { Schema, model, models } from 'mongoose';

const BookSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  author: {
    type: String,
    required: [true, 'Author is required.'],
  },
  status: {
    type: String,
    required: [true, 'Status is required.'],
  },
});

const Book = models.Book || model('Book', BookSchema);

export default Book;