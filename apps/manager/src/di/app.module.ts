import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from 'common/configuration/database.config';
import { AppController } from '../presentation/root/app/app.controller';
import { AuthApplicationModule } from './auth.module';
import { validate } from 'common/configuration/manager.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.moduleOptions.secret'),
        issuer: configService.get<string>(
          'jwt.moduleOptions.signOptions.issuer',
        ),
      }),
      inject: [ConfigService],
    }),
    AuthApplicationModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
