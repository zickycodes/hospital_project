import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const sequelize = app.get<Sequelize>(Sequelize);
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
    await app.listen(process.env.PORT || 3000);
    app.enableCors({
      allowedHeaders: ['content-type'],
      origin: 'http://localhost:8080',
      credentials: true,
    });
    // app.enableCors({
    //   allowedHeaders: ['content-type'],
    //   origin: 'http://localhost:8080',
    //   credentials: true,
    // });
    console.log('Application started');
    await sequelize.sync({});
  } catch (err) {
    console.log('Failed to connect to the database:', err);
    return;
  }
}
bootstrap();
