import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { currencyRateController, currencyRateValidation } from '../../modules/currencyRate';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(currencyRateValidation.createCurrencyRateSchema), currencyRateController.createCurrencyRate)
  .get(auth('manageUsers'), validate(currencyRateValidation.getCurrencyRatesSchema), currencyRateController.getCurrencyRates);

router
  .route('/:currencyRateId')
  .get(auth('manageUsers'), validate(currencyRateValidation.getCurrencyRateByIdSchema), currencyRateController.getCurrencyRateById)
  .put(auth('manageUsers'), validate(currencyRateValidation.updateCurrencyRateByIdSchema), currencyRateController.updateCurrencyRateById)
  .delete(auth('manageUsers'), validate(currencyRateValidation.deleteCurrencyRateByIdSchema), currencyRateController.deleteCurrencyRateById);

export default router;

/**
 * @swagger
 * tags:
 *   name: CurrencyRate
 *   description: Currency Rate Management
 */

/**
 * @swagger
 * /currency-rates:
 *   post:
 *     summary: Create a currency rate
 *     description: Only admins can create currency rates.
 *     tags: [CurrencyRate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - baseCurrency
 *               - targetCurrency
 *               - exchangeRate
 *               - currencyTime
 *             properties:
 *               baseCurrency:
 *                 type: string
 *                 description: The base currency code (e.g., USD)
 *               targetCurrency:
 *                 type: string
 *                 description: The target currency code (e.g., BRL)
 *               exchangeRate:
 *                 type: number
 *                 description: The exchange rate value
 *               currencyTime:
 *                 type: date
 *                 description: The currency time
 *             example:
 *               baseCurrency: USD
 *               targetCurrency: EUR
 *               exchangeRate: 1.2
 *               currencyTime: 2023-01-01
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CurrencyRate'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all currency rates
 *     description: Only admins can retrieve all currency rates.
 *     tags: [CurrencyRate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: baseCurrency
 *         schema:
 *           type: string
 *         description: Base currency code
 *       - in: query
 *         name: targetCurrency
 *         schema:
 *           type: string
 *         description: Target currency code
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query in the form of field:desc/asc (e.g., baseCurrency:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of currency rates
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CurrencyRate'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * /currency-rates/{currencyRateId}:
 *   get:
 *     summary: Get a currency rate by ID
 *     tags: [CurrencyRate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: currencyRateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Currency rate ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CurrencyRate'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   put:
 *     summary: Update a currency rate by ID
 *     tags: [CurrencyRate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: currencyRateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Currency rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - baseCurrency
 *               - targetCurrency
 *               - exchangeRate
 *             properties:
 *               baseCurrency:
 *                 type: string
 *                 description: The updated base currency code (e.g., USD)
 *               targetCurrency:
 *                 type: string
 *                 description: The updated target currency code (e.g., EUR)
 *               exchangeRate:
 *                 type: number
 *                 description: The updated exchange rate value
 *             example:
 *               baseCurrency: USD
 *               targetCurrency: EUR
 *               exchangeRate: 1.3
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CurrencyRate'
 *       "400":
 *         $ref: '#/components/responses/ValidationError'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a currency rate by ID
 *     tags: [CurrencyRate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: currencyRateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Currency rate ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
