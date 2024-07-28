import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongoDBService } from './db/mongo-database';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, MongoDBService, PrismaService],
})
export class AppModule {}
