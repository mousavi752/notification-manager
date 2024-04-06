import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Put, Body, Query } from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { ProviderDto } from '../dto/provider.dto';

@ApiTags('provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  async create(@Body() data: ProviderDto) {
    return await this.providerService.create({
      ...data,
      credentials: JSON.parse(JSON.stringify(data.credentials)),
    });
  }

  @Get()
  async getAll() {
    return await this.providerService.getAll();
  }

  @Put(':id')
  async update(@Query('id') providerId: string, @Body() data: ProviderDto) {
    return await this.providerService.update(
      {
        ...data,
        credentials: JSON.parse(JSON.stringify(data.credentials)),
      },
      { id: Number(providerId) }
    );
  }
}
