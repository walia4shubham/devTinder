import mongoose from 'mongoose';
const { Schema } = mongoose;

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['accepted', 'rejected', 'ignored', 'interested'],
      message: 'status type is wrong'
    }
  }
}, { timestamps: true });

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);

export default ConnectionRequest;