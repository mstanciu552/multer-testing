import mongoose from 'mongoose';

const test_schema = new mongoose.Schema({
  file_path: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Test', test_schema);
