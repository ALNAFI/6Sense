import { Controller, Post, Body, Patch, Get, Query, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/DTO/product.dto';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post('/create')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Patch('/update/:id')
  updateProduct(@Param('id') id: number, @Body() updateData: Partial<CreateProductDto>) {
    return this.productService.updateProduct(id, updateData);
  }
  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get('/show')
  getProducts(@Query() filters: any) {
    return this.productService.getProducts(filters);
  }
  @Get('/category/:category')
  getProductsByCategory(@Param('category') category: number) {
    return this.productService.getProducts({ category });
  }

  @Get('/both/:category/:name')
  getProductsByCategoryAndName(@Param('category') category: number, @Param('name') name: string) {
    return this.productService.getProducts({ category, name });
  }
  @Get('/name/:name')
  getProductsByName(@Param('name') name: string) {
    return this.productService.getProducts({ name });
  }
}
