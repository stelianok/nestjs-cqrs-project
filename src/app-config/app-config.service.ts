import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) { }

  get redisUrl(): string {
    return this.config.get<string>('REDIS_URL');
  }

  get starWarsApiBaseUrl(): string {
    return this.config.get<string>('STAR_WARS_API_BASE_URL');
  }

  get starWarsProtagonistId(): number {
    return this.config.get<number>('STAR_wARS_PROTAGONIST_ID');
  }
}