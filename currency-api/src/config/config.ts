import 'dotenv/config';

const config = {
  env: process.env['NODE_ENV'],
  port: process.env['API_PORT'],
  jwt: {
    secret: 'secret',
    accessExpirationMinutes: 60,
    refreshExpirationDays: 7,
    resetPasswordExpirationMinutes: 60,
    verifyEmailExpirationMinutes: 60
  },
  mongoose: {
    url: process.env['MONGODB_URL'] + (process.env['NODE_ENV'] === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
};

export default config;
