import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit = async () => await this.$connect();

  enableShutdownHooks = async (app: INestApplication) =>
    this.$on('beforeExit', async () => await app.close());
}
