import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { UploadRequestDTO, UploadResponseDTO } from "modules/upload-file/upload-file.dto";
import { UploadFileService } from "modules/upload-file/upload-file.service";

@ApiTags("Upload file")
@Controller("/upload")
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post("/image")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOkResponse({ type: UploadResponseDTO })
  async uploadGarbageImage(@Body() body: UploadRequestDTO, @UploadedFile() file: Express.Multer.File) {
    const url = await this.uploadFileService.uploadImage(file);
    return { url };
  }
}
