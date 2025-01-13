import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/DTO/category.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);
    return this.categoryRepository.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  } 
}
