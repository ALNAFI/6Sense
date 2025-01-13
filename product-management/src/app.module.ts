import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost',
    port: 8778, 
    username: 'postgres', 
    password: 'ALNAFI', 
    database: '6Sense',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ProductModule, CategoryModule,],
  controllers: [AppController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
