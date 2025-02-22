import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";

import { GLOBAL_CONFIG } from "configs/global.config";
import { LoggerMiddleware } from "middlewares/logger.middleware";
import { AppController } from "modules/app/app.controller";
import { AppService } from "modules/app/app.service";
import { CommentModule } from "modules/product/comment/comment.module";
import { ProductModule } from "modules/product/product.module";
import { UploadFileModule } from "modules/upload-file/upload-file.module";
import { LoggerModule } from "services/logger/logger.module";
import { PrismaModule } from "services/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    MulterModule.register({
      dest: "uploads/",
    }),

    LoggerModule,
    PrismaModule,
    UploadFileModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
    ProductModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: AppService, useClass: AppService },
  ],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
