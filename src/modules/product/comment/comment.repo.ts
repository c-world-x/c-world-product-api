import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateRequestDTO } from "modules/product/comment/comment.dto";
import { DeleteFromParentCommentParams } from "modules/product/comment/comment.type";
import { PrismaService } from "services/prisma/prisma.service";

@Injectable()
export class CommentRepo {
  constructor(private readonly prisma: PrismaService) {}

  async createWithoutParentComment(body: CreateRequestDTO) {
    const { content, userId, productId } = body;

    const aggregationResult = await this.prisma.productComment.aggregate({
      where: {
        productId,
      },
      _max: {
        right: true,
      },
    });

    const currMaxRight = aggregationResult._max.right || 0;

    const left = currMaxRight + 1;
    const right = left + 1;

    const data: Prisma.ProductCommentUncheckedCreateInput = {
      content,
      userId,
      productId,
      left,
      right,
    };

    return this.create(data);
  }

  async createWithParentComment(body: CreateRequestDTO) {
    const { content, userId, productId, parentId } = body;

    const parentComment = await this.prisma.productComment.findUnique({
      where: {
        id: parentId,
      },
    });

    const left = parentComment.right;
    const right = left + 1;

    const data: Prisma.ProductCommentUncheckedCreateInput = {
      content,
      userId,
      productId,
      left,
      right,
      parentId,
    };

    // todo: refactor -> using transaction
    await this.updateMany({
      where: {
        right: {
          gte: parentComment.right,
        },
      },
      data: {
        right: {
          increment: 2,
        },
      },
    });

    await this.updateMany({
      where: {
        left: {
          gt: parentComment.right,
        },
      },
      data: {
        left: {
          increment: 2,
        },
      },
    });

    return this.create(data);
  }

  async deleteFromParentComment(params: DeleteFromParentCommentParams) {
    const { parentComment, productId } = params;
    const { left: parentLeft, right: parentRight } = parentComment;
    const width = parentRight - parentLeft + 1;

    // todo: using transaction

    await this.deleteMany({
      productId,
      left: {
        gte: parentLeft,
        lte: parentRight,
      },
    });

    await this.updateMany({
      where: {
        productId,
        right: {
          gt: parentRight,
        },
      },
      data: {
        right: {
          decrement: width,
        },
      },
    });

    await this.updateMany({
      where: {
        productId,
        left: {
          gt: parentRight,
        },
      },
      data: {
        left: {
          decrement: width,
        },
      },
    });

    return;
  }

  async findOne(params: { where: Prisma.ProductCommentWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.productComment.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductCommentWhereUniqueInput;
    where?: Prisma.ProductCommentWhereInput;
    orderBy?: Prisma.ProductCommentOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productComment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async count(where?: Prisma.ProductCommentWhereInput) {
    return this.prisma.productComment.count({ where });
  }

  async create(data: Prisma.ProductCommentUncheckedCreateInput) {
    return this.prisma.productComment.create({
      data,
    });
  }

  async update(params: { where: Prisma.ProductCommentWhereUniqueInput; data: Prisma.ProductCommentUpdateInput }) {
    const { where, data } = params;
    return this.prisma.productComment.update({
      data,
      where,
    });
  }

  async updateMany(params: { where: Prisma.ProductCommentWhereInput; data: Prisma.ProductCommentUpdateInput }) {
    const { where, data } = params;
    return this.prisma.productComment.updateMany({
      where,
      data,
    });
  }

  async delete(where: Prisma.ProductCommentWhereUniqueInput) {
    return this.prisma.productComment.delete({
      where,
    });
  }

  async deleteMany(where: Prisma.ProductCommentWhereInput) {
    return this.prisma.productComment.deleteMany({
      where,
    });
  }
}
