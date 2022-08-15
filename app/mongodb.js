import mongoose from 'mongoose';

const clientOptions = {
  useNewUrlParser: true,
  dbName: 'websocket'
};

const messageSchema = new mongoose.Schema({ log: 'string' });
const Message = mongoose.model('Message', messageSchema);

const initClientDbConnection = async (url) => {
  try {
    const cnx = await mongoose.connect('mongodb://'+ url, clientOptions);
    return Message;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default initClientDbConnection;
