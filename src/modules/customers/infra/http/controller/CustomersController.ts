import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const costumer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(costumer);
  }
}
