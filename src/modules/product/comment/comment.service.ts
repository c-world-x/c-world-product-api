import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, ProductComment } from "@prisma/client";

import { CreateRequestDTO, DeleteRequestDTO, ListRequestDTO } from "modules/product/comment/comment.dto";
import { CommentRepo } from "modules/product/comment/comment.repo";
import { MESSAGES } from "shared/constants/messages.constants";

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepo) {}

  create(body: CreateRequestDTO) {
    const { parentId } = body;
    return parentId
      ? this.commentRepo.createWithParentComment(body)
      : this.commentRepo.createWithoutParentComment(body);
  }

  async getList(query: ListRequestDTO) {
    const { parentId } = query;

    const parentComment = parentId && (await this.checkExistingById(parentId));

    return this.commentRepo.findAll({
      where: this.generateFilters(query, parentComment),
      orderBy: {
        left: "asc",
      },
    });
  }

  async delete(params: DeleteRequestDTO) {
    const { productId, commentId } = params;
    const comment = await this.checkExistingById(commentId);

    return this.commentRepo.deleteFromParentComment({
      parentComment: comment,
      productId,
    });
  }

  count() {
    return 1;
  }

  private generateFilters(query: ListRequestDTO, parentComment?: ProductComment) {
    const { productId } = query;

    const parentCondition: Prisma.ProductCommentWhereInput = parentComment && {
      left: {
        gte: parentComment.left,
      },
      right: {
        lte: parentComment.right,
      },
    };

    return {
      productId,
      AND: parentComment ? parentCondition : undefined,
    };
  }

  private async checkExistingById(id: number) {
    const comment = await this.commentRepo.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException({
        message: MESSAGES.NOT_FOUND_COMMENT,
      });
    }

    return comment;
  }
}
