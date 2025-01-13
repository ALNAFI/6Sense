import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/entities/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product,Category]), ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
