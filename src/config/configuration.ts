import { Message } from '../database/entities/message/message.entity';

const Configuration = () => ({
  dbConfiguration: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Message],
    synchronize: true,
  },
});

export default Configuration;
