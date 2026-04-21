import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface RealtimeMessage<T = unknown> {
  topic: string;
  payload: T;
}

@Injectable({
  providedIn: 'root',
})
export class RealtimeGatewayService {
  private readonly messageBus = new Subject<RealtimeMessage>();

  connect(): void {
    // Reserved integration point for WebSocket or MQTT client bootstrap.
  }

  disconnect(): void {
    // Reserved integration point for transport teardown.
  }

  messages$<T = unknown>(topic?: string): Observable<RealtimeMessage<T>> {
    return new Observable((subscriber) => {
      const subscription = this.messageBus.subscribe((message) => {
        if (!topic || topic === message.topic) {
          subscriber.next(message as RealtimeMessage<T>);
        }
      });

      return () => subscription.unsubscribe();
    });
  }
}
