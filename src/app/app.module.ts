import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { appRoutes } from './routes';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/index';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EditEventComponent,
  CreateSessionComponent,
  SessionListComponent,
  EventListResolver,
  EventResolver,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidaorDirective,
} from './events/index';

import {
  NotificationService,
  CollapsibleWellComponent,
  JQUERY_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective,
  HighlightDirective,
} from './common/index';

import { WelcomeComponent } from './index';

declare global {
  interface Window {
    $: any;
  }
}

const jQuery = window.$;

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    ToastrModule.forRoot({
      timeOut: 888,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    NavBarComponent,
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    EditEventComponent,
    SessionListComponent,
    Error404Component,
    CollapsibleWellComponent,
    SimpleModalComponent,
    DurationPipe,
    ModalTriggerDirective,
    HighlightDirective,
    UpvoteComponent,
    LocationValidaorDirective,
    WelcomeComponent,
  ],
  providers: [
    AuthService,
    EventService,
    NotificationService,
    EventListResolver,
    EventResolver,
    {
      provide: 'CanDeactivateCreateEvent',
      useValue: checkDirtyState,
    },
    {
      provide: JQUERY_TOKEN,
      useValue: jQuery,
    },
    VoterService,
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  return component.isDirty ? showConfirm() : true;
}

export function showConfirm() {
  return window.confirm(
    'You have not saved this event, do you really want to cancel?'
  );
}
