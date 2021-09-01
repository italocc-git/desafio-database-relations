/* eslint-disable import/no-unresolved */
import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // TODO
    const product = await this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // TODO
    const findProductByName = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findProductByName;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // TODO

    const productsIds = products.map(product => product.id);
    // [1,2,3,4,5]
    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existentProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // Chalenge => Receber o array de produtos e atualizar apenas a quantidade do produto passado por parametro
    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
