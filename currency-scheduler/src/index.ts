import * as jobsControlller from './modules/jobs/jobs.controller';
import cron from 'node-cron';
import logger from './modules/logger/logger';


// Define the cron schedule (every hour at minute 0)
cron.schedule('* * * * *', jobsControlller.populateCurrencyRates);

logger.info('Cron job scheduled. Waiting for the task to run...');
