import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AuthModule, DataModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
