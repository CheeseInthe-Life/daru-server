import { Module } from '@nestjs/common';
import { CustomerController } from '../controller/customer.controller';
import { CustomerService } from '../service/customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
