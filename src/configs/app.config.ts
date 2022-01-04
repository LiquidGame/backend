import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: +process.env.APP_PORT || 4000,
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'Vrx7GQpV55589SsmYmm7B4fHzgCBdu',
  version: process.env.APP_VERSION,
}));
