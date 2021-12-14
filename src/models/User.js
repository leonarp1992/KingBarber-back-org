import moongose from 'mongoose';

const UserSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  services: [{
    type: moongose.Schema.Types.ObjectId,
    ref: 'Service'
  }]
});

export default moongose.model('User', UserSchema);