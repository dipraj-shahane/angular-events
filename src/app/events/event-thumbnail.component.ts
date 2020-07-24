import { Component, Input } from '@angular/core';
import { IEvent } from './shared/index';

@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail" style="border-radius: 25px;">
            <h3><img width="30px" height="30px" [src]="event.imageUrl"/> {{event.name | uppercase}}</h3>
            <div>Date: {{event.date | date:'fullDate' }} </div>
            <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
                Time: {{event.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: {{event.price | currency: 'INR'}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                Online URL: <a href="event?onlineUrl" class="onlineUrlLink">{{event?.onlineUrl}}</a>
            </div>
        </div>
    `,
    styles: [`
        .onlineUrlLink {
            color: aqua !important;
            font-weight: bold !important;
         }
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well div { color: white; }
    `]
})
export class EventThumbnailComponent {

    @Input() event: IEvent;

    getStartTimeClass() { // [ngClass]="getStartTimeClass()"
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        // return { green: isEarlyStart, bold: isEarlyStart };
        if (isEarlyStart) {
            return ['green', 'bold']; // return "green bold";
        }
        return []; // return "";
    }

    getStartTimeStyle() {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        return isEarlyStart ? { color: 'lightgreen', 'font-weight': 'bold' } : {};
    }
}
