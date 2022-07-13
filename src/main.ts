import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import rateLimit from 'express-rate-limit'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS
    const corsOptions = {
        credentials: true,
        origin: true
        // origin: ['http://localhost:3000', 'http://localhost:3000/user']
    }
    await app.enableCors(corsOptions)

    //Rate limit
    const limiter = rateLimit({
        windowMs: 15*60*1000,
        max: 500,
    })
    app.use(limiter)

    //CookieParser
    app.use(cookieParser())

    await app.listen(3001);
}

bootstrap();
