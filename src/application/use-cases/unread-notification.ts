import { NotificatiosRepository } from '../repositories/notificatios-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationReponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificatiosRepository) {}
  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationReponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
