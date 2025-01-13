import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/DTO/category.dto';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get('/show')
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Get('/show/:id')
  getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }
}
