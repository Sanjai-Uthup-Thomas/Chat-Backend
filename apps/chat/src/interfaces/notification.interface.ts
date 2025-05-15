import { Observable } from "rxjs";

export interface NotificationService {
  sendNotification(data: {
    userId: string;
    message: string
  }): Observable<{ success: boolean }>;
}