import { NotificatiosRepository } from '../repositories/notificatios-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationReponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificatiosRepository) {}
  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationReponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
