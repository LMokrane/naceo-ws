const mongoose = require('mongoose');

const clientOptions = {
  seNewUrlParser : true,
  dbName : 'websocket'
};

exports.initClientDbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mongo', clientOptions);
    console.log('Connected');
  } catch (error) {
    console.log(error);
    throw error;
  }
}