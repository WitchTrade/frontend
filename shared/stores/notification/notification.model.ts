export interface Notification {
  id: number
  duration: number
  content: string
  type: 'error' | 'warning' | 'info' | 'success'
}

export function createNotification(params: Partial<Notification>) {
  return {
    id: params.id ? params.id : null,
    duration: params.duration ? params.duration : null,
    content: params.content ? params.content : null,
    type: params.type ? params.type : null,
  } as Notification
}
