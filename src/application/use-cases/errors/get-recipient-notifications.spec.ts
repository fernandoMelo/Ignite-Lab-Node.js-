import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/content";
import { makeNotificationFactory } from "@test/factories/notification-factory";
import { GetRecipientNotification } from "@application/use-cases/get-recipient-notifications";

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'example-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-id-1' }),
        expect.objectContaining({ recipientId: 'example-id-1' }),
      ]),
    );
  });
});
