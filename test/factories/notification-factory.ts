import { Notification, NotificationProps } from "@application/entities/notification";
import { Content } from "@application/entities/content";

type Override = Partial<NotificationProps>;
export function makeNotificationFactory(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'example-id-1',
    ...override,
  });
}