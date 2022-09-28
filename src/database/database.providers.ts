import { DataSource } from 'typeorm';
import { Message } from "../database/entities/message/message.entity";
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'sammy',
                password: 'Hello@123',
                database: 'chat',
                entities: [
                    Message
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];