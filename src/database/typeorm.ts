import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import databaseConfig from 'configs/database.config';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forFeature(databaseConfig)],
  useFactory: async (configService: ConfigService) => ({
    name: configService.get('db.name'),
    type: 'postgres',
    host: configService.get('db.host') || 'localhost',
    port: +configService.get('db.port') || 5432,
    username: configService.get('db.username') || 'root',
    database: configService.get('db.database') || 'postgres',
    password: configService.get('db.password') || 'root',
    entities: [join(__dirname, '../models', '*.entity.{ts,js}')],
    synchronize: false,
    logging: configService.get('db.logging'),
    extra: { connectionLimit: configService.get('db.poolSize') },
    retryAttempts: 3,
    ssl: { rejectUnauthorized: false },
  }),
  inject: [ConfigService],
});
