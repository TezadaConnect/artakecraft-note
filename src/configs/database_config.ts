import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) return console.log('MongoDB is already connected');

  try {
    const connectionOption = {
      dbName: 'db_artakecraft',
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as mongoose.ConnectOptions;
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_CRED ?? '', connectionOption);
    isConnected = true;
    console.log('MongoDB connected!');
  } catch (error) {
    console.log(error);
  }
};
