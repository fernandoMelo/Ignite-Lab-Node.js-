import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificatiosRepository } from '@application/repositories/notificatios-repository';
import { PrismaNotificationsRepository } from './prisma/repository/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificatiosRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificatiosRepository],
})
export class DatabaseModule {}
