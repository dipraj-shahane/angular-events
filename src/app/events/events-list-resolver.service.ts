import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map } from 'rxjs/operators';

import { EventService } from './shared/event.service';
import { IEvent } from './shared';

@Injectable()
export class EventListResolver implements Resolve<IEvent[]> {

    constructor(private eventService: EventService) {
    }

    resolve() {
        return this.eventService.getEvents();
    }

}
