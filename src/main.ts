import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
// import { cors } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const sequelize = app.get<Sequelize>(Sequelize);
  try {
    // await sequelize.authenticate();
    console.log('Connected to the database');
    await app.listen(process.env.PORT || 3000);
    // app.enableCors({
    //   allowedHeaders: ['Content-Type', 'Authorization'], // Include "Authorization" header
    //   origin: 'http://localhost:8080',
    //   credentials: true,
    // });

    // app.enableCors({
    //   allowedHeaders: ['content-type'],
    //   origin: 'http://localhost:8080',
    //   credentials: true,
    // });
    // app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Content-Type, Accept, Authorization',
    //   );
    //   next();
    // });

    // app.enableCors({
    //   origin: '*',
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   allowedHeaders: ['Content-Type', 'Authorization'],
    //   preflightContinue: false,
    //   optionsSuccessStatus: 200,
    // });
    // app.use(cors());
    console.log('Application started');
    // await sequelize.sync({});
  } catch (err) {
    console.log('Failed to connect to the database:', err);
    return;
  }
}
bootstrap();
