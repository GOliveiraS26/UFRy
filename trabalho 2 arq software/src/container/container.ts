import { Container } from 'inversify';
import { PrismaClient } from '@prisma/client';

import { TYPES } from './types';

import { IMailProvider } from '../providers/IMailProvider';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { IPaymentMethod } from '../payments/IPaymentMethod';

import { EtherealMailProvider } from '../providers/EtherealMailProvider';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { PrismaProductRepository } from '../repositories/PrismaProductRepository';

import { ConsoleMailProvider } from '../providers/ConsoleMailProvider';
import { InMemoryOrderRepository } from '../repositories/InMemoryOrderRepository';
import { InMemoryProductRepository } from '../repositories/InMemoryProductRepository';

import { CreditCardPayment } from '../payments/CreditCardPayment';
import { DebitCardPayment } from '../payments/DebitCardPayment';
import { PixPayment } from '../payments/PixPayment';
import { PaymentMethodRegistry } from '../payments/PaymentMethodRegistry';

import { NotificationService } from '../services/NotificationService';
import { OrderService } from '../services/OrderService';
import { OrderController } from '../controllers/OrderController';

const env = process.env.APP_ENV ?? 'dev';

const container = new Container();

container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(CreditCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(DebitCardPayment);
container.bind<IPaymentMethod>(TYPES.PaymentMethod).to(PixPayment);
container.bind<PaymentMethodRegistry>(TYPES.PaymentMethodRegistry).to(PaymentMethodRegistry);

if (env === 'test') {
  container.bind<IMailProvider>(TYPES.MailProvider).to(ConsoleMailProvider).inSingletonScope();
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(InMemoryOrderRepository).inSingletonScope();
  container.bind<IProductRepository>(TYPES.ProductRepository).to(InMemoryProductRepository).inSingletonScope();
} else {
  const prisma = new PrismaClient();
  container.bind<PrismaClient>(PrismaClient).toConstantValue(prisma);
  container.bind<IMailProvider>(TYPES.MailProvider).to(EtherealMailProvider).inSingletonScope();
  container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
  container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();
}

container.bind<NotificationService>(TYPES.NotificationService).to(NotificationService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);

export { container };

