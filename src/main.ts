import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { useContainer } from "class-validator";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { SwaggerConfig } from "configs/config.interface";
import { GLOBAL_CONFIG } from "configs/global.config";
import { AppModule } from "modules/app/app.module";
import { API_PREFIX } from "shared/constants/global.constants";
import { isDev } from "shared/helpers/env.helpers";
import { AllExceptionFilter } from "common/filters/all-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "error", "warn"],
  });

  const configService = app.get<ConfigService>(ConfigService);

  const PORT = configService.get<number>("PORT") || GLOBAL_CONFIG.nest.port;

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: PORT,
    },
  });

  microservice.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  microservice.useGlobalFilters(new AllExceptionFilter(configService));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix(API_PREFIX);

  app.use(
    cors({
      origin: isDev()
        ? [GLOBAL_CONFIG.external.frontend_url, "http://localhost:3000"]
        : GLOBAL_CONFIG.external.frontend_url,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const swaggerConfig = configService.get<SwaggerConfig>("swagger");

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || "Nestjs")
      .setDescription(swaggerConfig.description || "The nestjs API description")
      .setVersion(swaggerConfig.version || "1.0")
      .addBearerAuth()
      .addSecurityRequirements("bearer")
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || "api", app, document);
  }

  await microservice.listen();
}

bootstrap().then(() => null);
