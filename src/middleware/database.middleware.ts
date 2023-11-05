import mongoose from 'mongoose';

async function databaseManager(user: string | undefined, password: string | undefined, path: string | undefined): Promise<void> {
  try {
    const uri = `mongodb+srv://${user}:${password}${path}`;
    await mongoose.connect(uri);
    console.log('You successfully connected to MongoDB database.');
  } catch (error: any) {
    console.error(error.message)
  }
}

export default databaseManager;
