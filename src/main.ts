import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import rateLimit from 'express-rate-limit'
import * as cookieParser from 'cookie-parser'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS
    const corsOptions = {
        credentials: true,
        origin: true
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

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3001);
}

bootstrap();
