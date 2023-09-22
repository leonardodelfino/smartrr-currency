import mongoose from 'mongoose';
import config from '../../config/config';

const setupTestDB = (clearDB: boolean = true) => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url);
  });

  beforeEach(async () => {
    if(clearDB) {
      await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})));
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
