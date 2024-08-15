import 'dotenv/config'

import express from "express";
import logger from 'loglevel';

import * as db from './db/index.js';
import { config } from './config.js';

const app = express();

app.get("/", (req, res) => {
  res.send('Hello World!')
});

(async () => {
  try {
    logger.setLevel(config.isProduction() ? 'INFO' : 'DEBUG');
    logger.debug('Started script');

    logger.debug(`DB connecting: ${config.getDbUrl()}`);

    await db.connect(config.getDbUrl());

    app.listen(config.getPort(), () => { logger.info(`Server running on port ${config.getPort()}`); });
  } catch (err) {
    logger.error(err);
    logger.info('Script stopped unexpectedly');

    process.exit(1);
  }
})();
