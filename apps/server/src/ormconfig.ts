import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const config = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};
const connectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  migrationsRun: false,
  synchronize: true,
  logging: true,
  autoReconnect: true,
  autoLoadEntities: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectionInterval: 1000,
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: './migrations',
  },
} as ConnectionOptions;

export default connectionOptions;
