import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        REDIS_URL: Joi.string().required(),
        STAR_WARS_API_BASE_URL: Joi.string().required(),
        STAR_WARS_PROTAGONIST_ID: Joi.number().required().default(2),
      })
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule { }
