
const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.get('MONGO_URI'), {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true

    });

    console.log(`MongoDB Connected: ${conn.connection.host}`)

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};


module.exports = connectDB;