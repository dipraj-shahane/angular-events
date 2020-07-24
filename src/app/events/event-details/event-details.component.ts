import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventService, IEvent, ISession } from '../shared/index';
import { NotificationService } from '../../common/notification.service';
import { AuthService } from 'src/app/user';

@Component({
  templateUrl: './event-details.component.html',
  styles: [
    `
      .container {
        padding-left: 20px;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      .onlineUrlLink {
        color: aqua !important;
        font-weight: bold !important;
      }
      .btn-custom {
        border-radius: 0px 12px;
        font-weight: bolder;
      }

      .btn-sort, .btn-filter {
        color: white;
        background-color: teal;
        border-radius: 0px 12px;
        font-weight: bolder;
      }

      a {
        cursor: pointer;
      }
    `,
  ],
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.resetState(data.event);
    });
  }

  getStartTimeStyle() {
    const isEarlyStart = this.event && this.event.time === '8:00 am';
    return isEarlyStart ? { color: 'lightgreen', 'font-weight': 'bold' } : {};
  }

  resetState(event: IEvent) {
    this.event = event;
    this.addMode = false;
    this.filterBy = 'all';
    this.sortBy = 'votes';
  }

  addSession() {
    this.addMode = true;
  }

  handleSaveNewSession(newSession: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((session) => session.id)
    );
    newSession.id = nextId + 1;
    this.event.sessions.push(newSession);
    this.eventService.saveEvent(this.event).subscribe(() => {
      this.addMode = false;
      this.event.sessions.push(newSession);
      this.notificationService.success(
        `${newSession.name} added successfully.`,
        'Add Session'
      );
    });
  }

  handleCancelAddSession() {
    this.addMode = false;
  }
}
