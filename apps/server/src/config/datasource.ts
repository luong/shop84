import config from './config';
import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();

export default new DataSource(config().database as DataSourceOptions);