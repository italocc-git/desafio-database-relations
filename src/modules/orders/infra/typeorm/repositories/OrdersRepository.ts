/* eslint-disable import/no-unresolved */
import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    // TODO
    const createOrder = this.ormRepository.create({
      customer,
      order_products: products,
    });
    await this.ormRepository.save(createOrder);

    return createOrder;
  }

  public async findById(id: string): Promise<Order | undefined> {
    // TODO
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customers'],
    });

    return order;
  }
}

export default OrdersRepository;
