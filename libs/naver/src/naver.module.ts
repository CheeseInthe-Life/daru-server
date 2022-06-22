import { NotificationDiToken } from '@domain/domain/interface/di/notification.token';
import { HttpModule } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { NotificationServiceImpl } from './notification.service';

const serviceProviders: Provider[] = [
  {
    provide: NotificationDiToken.NotificationService,
    useClass: NotificationServiceImpl,
  },
];

@Module({
  imports: [HttpModule],
  providers: [...serviceProviders],
  exports: [...serviceProviders],
})
export class NaverModule {}
