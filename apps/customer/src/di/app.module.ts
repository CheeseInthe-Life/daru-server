import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../presentation/root/app/app.controller';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import databaseConfig from 'configuration/database.config';
import { validate } from 'configuration/costomer.env.validation';
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
        configService.get('database'),
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
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
