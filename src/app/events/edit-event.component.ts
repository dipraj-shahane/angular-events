import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IEvent, EventService } from './shared/index';
import { NotificationService } from '../common';

@Component({
    templateUrl: './edit-event.component.html',
    styles: [`
    em { float: right; color: crimson; padding-left: 10px;}
    .error input { background-color: lightcoral; }
    .error ::-webkit-input-placeholder { color: white; }
  `]
})
export class EditEventComponent implements OnInit {

    event: IEvent;

    constructor(private router: Router, private route: ActivatedRoute,
                private eventService: EventService, private notification: NotificationService) {
    }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.event = data.event;
            if (this.event.location == null) {
                this.event.location = {
                    address: '',
                    city: '',
                    country: ''
                };
            }
        });
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    editEvent(event: IEvent) {
        this.eventService.saveEvent(this.event).subscribe(() => {
            this.router.navigate([`/events/${this.event.id}`]);
            this.notification.success('Event details modified successfully.', this.event.name);
        });
    }
}
