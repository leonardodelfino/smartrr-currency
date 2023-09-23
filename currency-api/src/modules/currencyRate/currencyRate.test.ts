import request from 'supertest';
import mongoose from 'mongoose';
import moment from 'moment';
import app from '../../app';
import setupTestDB from '../jest/setupTestDB';
import User from '../user/user.model';
import config from '../../config/config';
import * as tokenService from '../token/token.service';
import tokenTypes from '../token/token.types';
import CurrencyRate from './currencyRate.model';

setupTestDB(false);

const password = 'password1';
const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

const admin = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Admin User',
  email: 'admin@example.com',
  password,
  role: 'admin',
  isEmailVerified: true,
};

const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);

describe('Currency Rate Controller', () => {
  beforeAll(async () => {
    await User.create(admin);
  });

  describe('POST /v1/currency-rates', () => {
    test('should get all currency rates', async () => {
      const response = await request(app)
        .get('/v1/currency-rates')
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.results.length).toBe(0);
      expect(response.body.totalResults).toBe(0);
      expect(response.body.totalPages).toBe(0);
    });

    test('should create a new currency rate', async () => {
      const currencyRateData = {
        baseCurrency: 'USD',
        targetCurrency: 'EUR',
        exchangeRate: 1.2,
        currencyTime: new Date(),
      };

      const response = await request(app)
        .post('/v1/currency-rates')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(currencyRateData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.baseCurrency).toBe('USD');
    });

    test('should get the new currency rate', async () => {
      const response = await request(app)
        .get('/v1/currency-rates')
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.results[0].baseCurrency).toBe('USD');
      expect(response.body.totalResults).toBe(1);
      expect(response.body.totalPages).toBe(1);
    });

    test('should handle errors when creating a currency rate with wrong data', async () => {
      const invalidCurrencyRateData = {
        baseCurrency: 'US DOLLAR',
      };

      const response = await request(app)
        .post('/v1/currency-rates')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidCurrencyRateData);

      expect(response.status).toBe(400);
    });

    test('should handle errors when getting a currency rate by an invalid ID', async () => {
      const invalidCurrencyRateId = 'invalid-id';

      const response = await request(app)
        .get(`/v1/currency-rates/${invalidCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /v1/currency-rates/:currencyRateId', () => {
    test('should get a currency rate by ID', async () => {
      const newCurrencyRate = await CurrencyRate.create({
        baseCurrency: 'GBP',
        targetCurrency: 'JPY',
        exchangeRate: 150.5,
        currencyTime: new Date(),
      });

      const response = await request(app)
        .get(`/v1/currency-rates/${newCurrencyRate._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(newCurrencyRate._id.toString());
    });

    test('should handle errors when getting a currency rate by an invalid ID', async () => {
      const invalidCurrencyRateId = 'invalid-id';

      const response = await request(app)
        .get(`/v1/currency-rates/${invalidCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(400);
    });

    test('should handle errors when getting a non-existent currency rate by ID', async () => {
      const nonExistentCurrencyRateId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .get(`/v1/currency-rates/${nonExistentCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /v1/currency-rates/:currencyRateId', () => {
    test('should update a currency rate by ID', async () => {
      const newCurrencyRate = await CurrencyRate.create({
        baseCurrency: 'EUR',
        targetCurrency: 'CAD',
        exchangeRate: 1.45,
        currencyTime: new Date(),
      });

      const updatedCurrencyRateData = {
        exchangeRate: 1.55,
      };

      const response = await request(app)
        .put(`/v1/currency-rates/${newCurrencyRate._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updatedCurrencyRateData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('exchangeRate', updatedCurrencyRateData.exchangeRate);
    });

    test('should handle errors when updating a currency rate by an invalid ID', async () => {
      const invalidCurrencyRateId = 'invalid-id';

      const response = await request(app)
        .put(`/v1/currency-rates/${invalidCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({ exchangeRate: 1.55 });

      expect(response.status).toBe(400);
    });

    test('should handle errors when updating a non-existent currency rate by ID', async () => {
      const nonExistentCurrencyRateId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/v1/currency-rates/${nonExistentCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({ exchangeRate: 1.55 });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /v1/currency-rates/:currencyRateId', () => {
    test('should delete a currency rate by ID', async () => {
      const newCurrencyRate = await CurrencyRate.create({
        baseCurrency: 'GBP',
        targetCurrency: 'AUD',
        exchangeRate: 2.0,
        currencyTime: new Date(),
      });

      const response = await request(app)
        .delete(`/v1/currency-rates/${newCurrencyRate._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(204);

      const deletedCurrencyRate = await CurrencyRate.findById(newCurrencyRate._id);
      expect(deletedCurrencyRate).toBeNull();
    });

    test('should handle errors when deleting a currency rate by an invalid ID', async () => {
      const invalidCurrencyRateId = 'invalid-id';

      const response = await request(app)
        .delete(`/v1/currency-rates/${invalidCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(400);
    });

    test('should handle errors when deleting a non-existent currency rate by ID', async () => {
      const nonExistentCurrencyRateId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .delete(`/v1/currency-rates/${nonExistentCurrencyRateId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
