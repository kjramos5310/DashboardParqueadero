import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

export interface TicketEvent {
  type: string;
  data: any;
}

@Injectable()
export class EventsService {
  private readonly stream = new Subject<TicketEvent>();

  emit(event: TicketEvent): void {
    this.stream.next(event);
  }

  asObservable(): Observable<TicketEvent> {
    return this.stream.asObservable();
  }
}
