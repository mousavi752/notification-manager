import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { SmsTemplateService } from '../services/sms-template.service';
import { SmsTemplateDto } from '../dto/sms-template.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sms-template')
@Controller('sms-template')
export class SmsTemplateController {
  constructor(private readonly smsTemplateService: SmsTemplateService) {}

  @Post()
  async create(@Body() data: SmsTemplateDto) {
    return await this.smsTemplateService.create(data);
  }

  @Get()
  async getAll() {
    return await this.smsTemplateService.getAll();
  }

  @Put(':id')
  async update(
    @Query('id') smsTemplateId: string,
    @Body() data: SmsTemplateDto
  ) {
    return await this.smsTemplateService.update(data, {
      id: Number(smsTemplateId),
    });
  }
}
