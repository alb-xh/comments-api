import 'dotenv/config'

import express from "express";
import logger from 'loglevel';

import { config } from './config.js';
import { connect } from './db/index.js';
import { yoga } from './yoga/index.js'

const app = express();

app.use(yoga.graphqlEndpoint, yoga);

(async () => {
  try {
    logger.setLevel(config.isProduction() ? 'INFO' : 'DEBUG');
    logger.debug('Started script');

    logger.debug(`DB connecting: ${config.getDbUrl()}`);

    await connect(config.getDbUrl());

    app.listen(config.getPort(), () => { logger.info(`Running a GraphQL API server at http://127.0.0.1:${config.getPort()}/graphql`); });
  } catch (err) {
    logger.error(err);
    logger.info('Script stopped unexpectedly');

    process.exit(1);
  }
})();
