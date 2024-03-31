import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [ConfigModule.forRoot({
    load: [EnvConfiguration],
    validationSchema: JoiValidationSchema,
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
