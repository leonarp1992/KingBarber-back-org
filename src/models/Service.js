import moongose from 'mongoose';

const ServiceSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default moongose.model('Service', ServiceSchema);