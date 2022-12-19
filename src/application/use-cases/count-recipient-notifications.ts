import { NotificatiosRepository } from '../repositories/notificatios-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsReponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificatiosRepository) {}
  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsReponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}