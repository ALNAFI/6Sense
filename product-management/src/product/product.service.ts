import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductCodeGenerator } from './product.utils';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from 'src/DTO/product.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOneBy({ id: dto.categoryId });
    if (!category) {
      throw new Error('Invalid category ID');
    }
    const productCode = ProductCodeGenerator.generate(dto.name);
    const discountedPrice = dto.price - (dto.price * (dto.discount || 0)) / 100;
    const product = this.productRepository.create({
      ...dto,
      productCode,
      discountedPrice: parseFloat(discountedPrice.toFixed(2)),
      category,
    });

    return this.productRepository.save(product);
  }

  async updateProduct(id: number, updateData: Partial<CreateProductDto>): Promise<Product> {
    await this.productRepository.update(id, updateData);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    if (updatedProduct) {
      const discountedPrice = updatedProduct.price - (updatedProduct.price * (updatedProduct.discount || 0)) / 100;
      updatedProduct.discountedPrice = parseFloat(discountedPrice.toFixed(2));
      await this.productRepository.save(updatedProduct);
    }
    return updatedProduct;
  }
  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ id });
  
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
  
    await this.productRepository.delete(id);
    return { message: `Product with ID ${id} successfully deleted.` };
  }
  

  async getProducts(filters: { category?: number; name?: string }): Promise<any[]> {
    const query = this.productRepository.createQueryBuilder('product');
    if (filters.category) {
      query.andWhere('product.category = :category', { category: filters.category });
    }
    if (filters.name) {
      query.andWhere('product.name LIKE :name', { name: `%${filters.name}%` });
    }
    const products = await query.getMany();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      originalPrice: product.price,
      discountedPrice: product.discountedPrice,
      discount: product.discount,
      status: product.status,
      productCode: product.productCode,
      image: product.image,
      category: product.category,
    }));
  }
}
