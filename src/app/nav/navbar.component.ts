import { Component, OnInit } from '@angular/core';

import { AuthService } from '../user/auth.service';
import { ISession, EventService, IEvent } from '../events/index';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 17px;
      }
      
      #searchForm {
        margin-right: 100px;
      }
      
      li > a {
        font-weight: bold;
        border-radius: 15px;
      }
      
      li > a.active {
        background-color: teal;
        color: white;
      }

      li > a:hover {
        background-color: white;
        color: teal;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  user: any;
  searchTerm = '';
  foundSessions: ISession[];
  eventList = [];

  constructor(
    public authService: AuthService,
    private eventService: EventService
  ) {
    this.eventService.getEvents().subscribe((events) => {
      this.eventList = events;
    });
  }

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
      this.foundSessions = sessions;
    });
  }
}
