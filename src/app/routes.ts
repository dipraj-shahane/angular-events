import { Routes } from '@angular/router';

import { Error404Component } from './errors/404.component';

import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EditEventComponent,
  CreateSessionComponent,
  EventListResolver,
  EventResolver,
} from './events/index';
import { WelcomeComponent } from './welcome.component';

export const appRoutes: Routes = [
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['CanDeactivateCreateEvent'],
  },
  {
    path: 'events/session/new',
    component: CreateSessionComponent,
  },
  {
    path: 'events/edit/:id',
    component: EditEventComponent,
    resolve: { event: EventResolver },
  },
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventListResolver },
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    resolve: { event: EventResolver },
  },
  {
    path: 'angular',
    component: WelcomeComponent,
  },
  {
    path: '',
    redirectTo: 'angular',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule),
  },
];
