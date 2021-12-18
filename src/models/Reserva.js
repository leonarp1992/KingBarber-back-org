import moongose from 'mongoose';

const ReservaSchema = new moongose.Schema({
  id_user: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required :true
  },
  id_service: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  id_barbero: {   
    type: moongose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  date: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required:true,
  }   
});

export default moongose.model('Reserva', ReservaSchema);