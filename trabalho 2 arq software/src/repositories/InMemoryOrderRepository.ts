import { injectable } from 'inversify';
import { Order, OrderLine } from '../domain/Order';
import { IOrderRepository } from './IOrderRepository';

@injectable()
export class InMemoryOrderRepository implements IOrderRepository {
  private pedidos: Order[] = [];
  private proximoId = 1;

  async create(customer: string, items: OrderLine[], total: number): Promise<Order> {
    const order: Order = {
      id: this.proximoId++,
      customer,
      items,
      total,
      status: 'confirmed',
    };
    this.pedidos.push(order);
    return order;
  }
}

