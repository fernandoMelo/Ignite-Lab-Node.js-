import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { NotificatiosRepository } from '../repositories/notificatios-repository';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationReponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificatiosRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationReponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
