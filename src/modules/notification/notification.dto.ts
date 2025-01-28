import { IntersectionType } from "@nestjs/swagger";
import { NotiType } from "@prisma/client";

import { EnumField, NumberField, StringField } from "shared/decorators/dto.decorator";
import { BasePaginationRequestDTO } from "shared/dto/base-pagination-request.dto";

export class QueryDTO {}

export class ListRequestDTO extends IntersectionType(QueryDTO, BasePaginationRequestDTO) {}

export class CountRequestDTO extends QueryDTO {}

export class BodyDTO {
  @EnumField(NotiType)
  type: NotiType;

  @StringField()
  content: string;

  @NumberField()
  receiverId: number;

  options?: string;
}

export class CreateNotiRequestDTO extends BodyDTO {}
