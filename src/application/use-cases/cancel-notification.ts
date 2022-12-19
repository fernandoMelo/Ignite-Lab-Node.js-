import { NotificatiosRepository } from '../repositories/notificatios-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationReponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificatiosRepository) {}
  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationReponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
