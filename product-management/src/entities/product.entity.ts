import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount: number;

  @Column('decimal', { nullable: true })
  discountedPrice: number; 
  
  @Column({ nullable: true })
  image: string;

  @Column()
  status: string;

  @Column({ unique: true })
  productCode: string;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;
}
