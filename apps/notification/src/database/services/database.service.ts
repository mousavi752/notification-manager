import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/db-notification';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
