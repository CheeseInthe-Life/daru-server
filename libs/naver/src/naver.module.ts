import { NotificationDIToken } from '@domain/domain/interface/di/notification.service.token';
import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { NotificationServiceImpl } from './notification.service';

const serviceProviders: Provider[] = [
  {
    provide: NotificationDIToken.NotificationService,
    useClass: NotificationServiceImpl,
  },
];

@Module({
  imports: [HttpModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class NaverModule {}
