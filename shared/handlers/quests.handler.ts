import { useState } from 'react';
import { Observable, of, tap } from 'rxjs';
import { Quest } from '../models/quest.model';
import authService from '../services/auth.service';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';

const useQuestsHandler = () => {
  const [quests, setQuests] = useState<Quest[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getQuests = async () => {
    setLoading(true);

    const fetchQuestSub = fetchQuests().subscribe(() => {
      setLoading(false);
    });

    return () => {
      fetchQuestSub.unsubscribe();
    }
  };

  const fetchQuests = (): Observable<Response> => {
    return authService.request(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/quests`).pipe(
      tap({
        next: async res => {
          const json = await res.json();
          if (res.ok) {
            setQuests(json);
          } else {
            const notification = createNotification({
              content: json.message,
              duration: 5000,
              type: 'error'
            });
            notificationService.addNotification(notification);
          }
        },
        error: err => {
          const notification = createNotification({
            content: err,
            duration: 5000,
            type: 'error'
          });
          notificationService.addNotification(notification);
          return of(err);
        }
      })
    );
  };

  return {
    quests,
    loading,
    getQuests
  };
};

export default useQuestsHandler;
