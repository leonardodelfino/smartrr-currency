import * as jobsControlller from './modules/jobs/jobs.controller';
import cron from 'node-cron';
import logger from './modules/logger/logger';

cron.schedule('0 * * * *', jobsControlller.populateCurrencyRates);

logger.info('Cron job scheduled. Waiting for the task to run...');
