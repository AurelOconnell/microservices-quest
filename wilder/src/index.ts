import mongoose from 'mongoose';

import app from './app';

const start = async () => {
  try {
    // Database
    await mongoose.connect('mongodb://wilder-mongo-srv:27017/wilderdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connected to database');

    // eslint-disable-next-line no-console
    app.listen(5000, () => console.log('Server started on 5000'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Start Server
start();
