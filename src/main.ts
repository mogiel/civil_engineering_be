import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import rateLimit from 'express-rate-limit'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //CORS
    const corsOptions = {
        origin: ['http://localhost:3000']
    }
    await app.enableCors(corsOptions)

    //Rate limit
    const limiter = rateLimit({
        windowMs: 15*60*1000,
        max: 100,
    })
    app.use(limiter)

    await app.listen(3001);
}

bootstrap();
