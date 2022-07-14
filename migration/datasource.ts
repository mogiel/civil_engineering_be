import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config({ path: './.env' })

export const connectionSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['./dist/**/**.entity{.ts,.js}'],
    bigNumberStrings: false,
    logging: false,
    migrationsTableName: 'migrations',
    migrations: ['migrations/*.ts'],
} as DataSourceOptions);
