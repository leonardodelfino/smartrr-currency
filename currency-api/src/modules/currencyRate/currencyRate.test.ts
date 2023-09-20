// import request from 'supertest';
// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import app from '../../app';
// import setupTestDB from '../jest/setupTestDB';
// import { NewCurrencyRate } from './currencyRate.interfaces';

// setupTestDB();

// describe('Currency Rate Routes', () => {
//   let adminAccessToken: string;
//   let userAccessToken: string;

//   // Add logic to obtain access tokens for admin and user

//   describe('POST /v1/currency-rates', () => {
//     test('should create a new currency rate', async () => {
//       const newCurrencyRate: NewCurrencyRate = {
//         baseCurrency: 'USD',
//         targetCurrency: 'EUR',
//         exchangeRate: 1.2,
//         currencyTime: new Date(),
//       };

//       const response = await request(app)
//         .post('/v1/currency-rates')
//         .set('Authorization', `Bearer ${adminAccessToken}`)
//         .send(newCurrencyRate)
//         .expect(httpStatus.CREATED);

//       // Add assertions to check the response and database state
//     });

//     // Add more test cases for different scenarios (e.g., validation errors, unauthorized, etc.)
//   });

//   describe('GET /v1/currency-rates', () => {
//     test('should get a list of currency rates', async () => {
//       const response = await request(app)
//         .get('/v1/currency-rates')
//         .set('Authorization', `Bearer ${userAccessToken}`)
//         .expect(httpStatus.OK);

//       // Add assertions to check the response contents
//     });

//     // Add more test cases for different scenarios (e.g., filtering, pagination, unauthorized, etc.)
//   });

//   describe('GET /v1/currency-rates/:currencyRateId', () => {
//     test('should get a specific currency rate', async () => {
//       const currencyRateId = mongoose.Types.ObjectId().toHexString();

//       const response = await request(app)
//         .get(`/v1/currency-rates/${currencyRateId}`)
//         .set('Authorization', `Bearer ${userAccessToken}`)
//         .expect(httpStatus.OK);

//       // Add assertions to check the response contents
//     });

//     // Add more test cases for different scenarios (e.g., not found, unauthorized, etc.)
//   });

//   describe('PUT /v1/currency-rates/:currencyRateId', () => {
//     test('should update a specific currency rate', async () => {
//       const currencyRateId = mongoose.Types.ObjectId().toHexString();
//       const updatedCurrencyRate: Partial<NewCreatedCurrencyRate> = {
//         exchangeRate: 1.3,
//       };

//       const response = await request(app)
//         .put(`/v1/currency-rates/${currencyRateId}`)
//         .set('Authorization', `Bearer ${adminAccessToken}`)
//         .send(updatedCurrencyRate)
//         .expect(httpStatus.OK);

//       // Add assertions to check the response and database state
//     });

//     // Add more test cases for different scenarios (e.g., validation errors, not found, unauthorized, etc.)
//   });

//   describe('DELETE /v1/currency-rates/:currencyRateId', () => {
//     test('should delete a specific currency rate', async () => {
//       const currencyRateId = mongoose.Types.ObjectId().toHexString();

//       const response = await request(app)
//         .delete(`/v1/currency-rates/${currencyRateId}`)
//         .set('Authorization', `Bearer ${adminAccessToken}`)
//         .expect(httpStatus.NO_CONTENT);

//       // Add assertions to check the database state
//     });

//     // Add more test cases for different scenarios (e.g., not found, unauthorized, etc.)
//   });
// });
