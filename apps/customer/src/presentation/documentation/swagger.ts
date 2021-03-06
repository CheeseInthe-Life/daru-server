import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerLoader = (application: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Daru Customer API')
    .setDescription('이 문서는 DARU의 고객 서비스용 API 문서입니다.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(application, config);
  SwaggerModule.setup('api', application, document);
};
