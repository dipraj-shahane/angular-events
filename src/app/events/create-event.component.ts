import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IEvent, EventService } from './shared/index';

@Component({
    templateUrl: './create-event.component.html',
    styles: [`
    em { float: right; color: crimson; padding-left: 10px;}
    .error input { background-color: lightcoral; }
    .error ::-webkit-input-placeholder { color: white; }
  `]
})
export class CreateEventComponent {
    isDirty = true;

    newEvent: IEvent;

    constructor(private router: Router, private eventService: EventService) {
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    saveEvent(newEventValues) {
        this.eventService.saveEvent(newEventValues)
            .subscribe(() => {
                this.isDirty = false;
                this.router.navigate(['/events']);
            });
    }
}
