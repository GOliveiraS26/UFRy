import { injectable } from 'inversify';
import { ProductData } from '../domain/IProduct';
import { IProductRepository } from './IProductRepository';

const produtos: ProductData[] = [
  { id: 1, name: 'Livro Físico', type: 'physical', price: 100 },
  { id: 2, name: 'E-book', type: 'digital', price: 50 },
];

@injectable()
export class InMemoryProductRepository implements IProductRepository {
  async findById(id: number): Promise<ProductData | null> {
    return produtos.find((p) => p.id === id) ?? null;
  }
}
