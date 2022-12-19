import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { CountRecipientNotification } from "@application/use-cases/count-recipient-notifications";
import { makeNotificationFactory } from "@test/factories/notification-factory";

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade!'),
      recipientId: 'example-id',
    });

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-id-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-id-1' }),
    );

    await notificationsRepository.create(
      makeNotificationFactory({ recipientId: 'example-id-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-id-1',
    });

    expect(count).toEqual(2);
  });
});
