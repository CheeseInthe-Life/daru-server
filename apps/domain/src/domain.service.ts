import { Injectable } from '@nestjs/common';

@Injectable()
export class DomainService {
  getHello(): string {
    return 'Hello World!';
  }
}
