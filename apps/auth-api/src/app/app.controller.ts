import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Auth } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Auth()
  @Get()
  getData() {
    return this.appService.getData();
  }
}
