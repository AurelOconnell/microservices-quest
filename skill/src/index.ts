import mongoose from 'mongoose';

import app from './app';

const start = async () => {
  try {
    // Database
    await mongoose.connect('mongodb://skill-mongo-srv/skilldb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log('Connected to database');

    // eslint-disable-next-line no-console
    app.listen(5001, () => console.log('Service Skill started on 5001'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Start Server
start();
