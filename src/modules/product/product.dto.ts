import { IntersectionType } from "@nestjs/swagger";

import { BasePaginationRequestDTO } from "shared/dto/base-pagination-request.dto";

export class QueryDTO {}

export class ListRequestDTO extends IntersectionType(QueryDTO, BasePaginationRequestDTO) {}

export class CountRequestDTO extends QueryDTO {}
