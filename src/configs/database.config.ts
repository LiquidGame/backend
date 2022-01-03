import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'root',
  database: process.env.DATABASE_DATABASE || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'root',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  poolSize: process.env.DATABASE_POOL_SIZE || 10,
  retryAttempts: 3,
  ssl: { rejectUnauthorized: false },
}));
