import { IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { NumberField, StringField } from "shared/decorators/dto.decorator";
import { BasePaginationRequestDTO } from "shared/dto/base-pagination-request.dto";

export class QueryDTO {
  @NumberField({ optional: true })
  @Type(() => Number)
  parentId?: number;
}

export class ListRequestDTO extends IntersectionType(QueryDTO, BasePaginationRequestDTO) {
  productId: number;
}

export class CountRequestDTO extends QueryDTO {}

export class BodyDTO {
  @StringField()
  content: string;

  @NumberField({ optional: true })
  parentId?: number;
}

export class CreateRequestDTO extends BodyDTO {
  productId: number;
  userId: number;
}

export type DeleteRequestDTO = {
  productId: number;
  commentId: number;
};
