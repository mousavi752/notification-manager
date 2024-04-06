import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/services/database.service';
import { ProviderType } from '@prisma/db-notification';
import { Prisma } from '@prisma/db-notification';

@Injectable()
export class ProviderService {
  constructor(private readonly db: DatabaseService) {}

  async selectSmsProvider() {
    return await this.db.provider.findFirstOrThrow({
      where: {
        isActive: true,
        type: ProviderType.SMS,
      },
    });
  }

  async selectEmailProvider() {
    return await this.db.provider.findFirstOrThrow({
      where: {
        isActive: true,
        type: ProviderType.EMAIL,
      },
    });
  }

  async create(data: Prisma.ProviderCreateInput) {
    return await this.db.provider.create({ data });
  }

  async update(
    data: Prisma.ProviderCreateInput,
    where: Prisma.ProviderWhereUniqueInput
  ) {
    return await this.db.provider.update({ data, where });
  }

  async getAll() {
    return await this.db.provider.findMany();
  }
}
