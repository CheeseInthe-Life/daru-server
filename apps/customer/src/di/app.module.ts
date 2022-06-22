import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from '../presentation/root/app/app.controller';
import { AuthApplicationModule } from './auth.module';
import { UserApplicationModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import databaseConfig from 'configuration/database.config';
import { validate } from 'configuration/customer.env.validation';
import customerJwtConfig from 'configuration/customer.jwt.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, customerJwtConfig],
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
    UserApplicationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
