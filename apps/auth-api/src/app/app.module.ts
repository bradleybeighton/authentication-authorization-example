import { Module } from '@nestjs/common';

import { LoginModule } from './login/login.module';
import { AppController } from './app.controller';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [JwtService, AppService],
})
export class AppModule {}
