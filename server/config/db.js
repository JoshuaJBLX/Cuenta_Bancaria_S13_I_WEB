import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cuenta_bancaria');
    console.log('\x1b[32m[DB]\x1b[0m MongoDB conectado');
  } catch (error) {
    console.error('\x1b[31m[DB]\x1b[0m Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;