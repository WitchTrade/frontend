export interface ServerNotification {
  id: number;
  created: Date;
  text: string;
  link?: string;
  iconLink?: string;
}

export function createServerNotification(params: Partial<ServerNotification>) {
  return {
    id: params.id ? params.id : null,
    created: params.created ? params.created : null,
    text: params.text ? params.text : null,
    link: params.link ? params.link : null,
    iconLink: params.iconLink ? params.iconLink : null,
  } as ServerNotification;
}
