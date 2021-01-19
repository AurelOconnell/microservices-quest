import app from './app';

const start = async () => {
  try {
    app.listen(5002, () => console.log('Service vote started on 5002'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Start Server
start();
