import moongose from 'mongoose';

const ServiceSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default moongose.model('Service', ServiceSchema);