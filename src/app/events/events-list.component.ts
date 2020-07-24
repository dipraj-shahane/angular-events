import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from './shared/event.service';
import { NotificationService } from '../common/notification.service';
import { IEvent } from './shared/index';

@Component({
    template: `
    <div>
        <h2>Upcoming Angualr Events</h2>
        <hr />
        <div class="row">
            <div *ngFor="let event of events;" class="col-md-4" [highlight]="'crimson'">
                <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .angular {
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("/assets/images/angular.svg");
        }
    `]
})
export class EventsListComponent implements OnInit {
    events: IEvent[];

    constructor(private eventService: EventService,
        private notifyService: NotificationService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.eventService.getEvents().subscribe(events => this.events = events);
        this.events = this.route.snapshot.data.events;
    }

    handleThumbnailClick(eventName) {
        this.notifyService.success(eventName, 'Event Name: ');
    }
}
