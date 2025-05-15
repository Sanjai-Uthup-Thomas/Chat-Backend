import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sendNotification(data: { userId: string; message: string }) {
    // For now, we’ll just simulate sending a notification
    console.log(`🔔 Notification for user ${data.userId}`);
    console.log(`message: ${data.message}`);

    // Simulated success response
    return { success: true };
  }
}
