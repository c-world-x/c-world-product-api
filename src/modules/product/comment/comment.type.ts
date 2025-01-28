import { ProductComment } from "@prisma/client";

export type DeleteFromParentCommentParams = {
  productId: number;
  parentComment: ProductComment;
};
