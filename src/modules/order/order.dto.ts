import { IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { ArrayField, NumberField } from "shared/decorators/dto.decorator";
import { BasePaginationRequestDTO } from "shared/dto/base-pagination-request.dto";

export class QueryDTO {}

export class ListRequestDTO extends IntersectionType(QueryDTO, BasePaginationRequestDTO) {}

export class CountRequestDTO extends QueryDTO {}

export class OrderProductDTO {
  @NumberField()
  productId: number;

  @NumberField()
  quantity: number;
}

export class BodyDTO {
  @Type(() => OrderProductDTO)
  @ArrayField(OrderProductDTO, { optional: false }, { min: 1 })
  orderProducts: OrderProductDTO[];
}

export class CreateRequestDTO extends BodyDTO {
  userId: number;
}
