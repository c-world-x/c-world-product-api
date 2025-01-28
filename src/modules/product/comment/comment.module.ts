import { Module } from "@nestjs/common";

import { CommentController } from "modules/product/comment/comment.controller";
import { CommentRepo } from "modules/product/comment/comment.repo";
import { CommentService } from "modules/product/comment/comment.service";
import { PrismaModule } from "services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepo],
  exports: [],
})
export class CommentModule {}
