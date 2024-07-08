// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: ".env.development" });

import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.POSTGRES_URL + (process.env.NODE_ENV === 'development' ? '' : '?sslmode=require'),
  migrations: {
    extension: 'ts',
  },
};

export default config;