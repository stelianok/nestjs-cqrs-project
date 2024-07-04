import { Controller, Get } from "@nestjs/common";
import axios from 'axios';
import { AppConfigService } from "src/app-config/app-config.service";

@Controller('star-wars')
export class StarWarsController {
  private readonly apiBaseUrl: string;
  private readonly protagonistId: number;

  constructor(config: AppConfigService) {
    this.apiBaseUrl = config.starWarsApiBaseUrl
    this.protagonistId = config.starWarsProtagonistId
  }

  @Get('characters')
  getCharacters() {
    return axios
      .get(`${this.apiBaseUrl}/people`)
      .then((response) => response.data);
  }

  @Get('protagonist')
  getProtagonist() {
    return axios
      .get(`${this.apiBaseUrl}/people/${this.protagonistId}`)
      .then((response) => response.data)
  }
}