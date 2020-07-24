import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/user';

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.css'],
  template: `
    <div class="votingWidgetContainer">
      <div class="well votingWidget">
        <div class="votingButton pointable">
          <i
            *ngIf="auth.isAuthenticated()"
            class="glyphicon glyphicon-heart"
            [style.color]="heartColor"
            (click)="onClick()"
          ></i>
          <i
            *ngIf="!auth.isAuthenticated()"
            class="glyphicon glyphicon-heart"
            [style.color]="heartColor"
            [routerLink]="['/user/login']"
            title="Please Login to vote.."
          ></i>
        </div>
        <div class="badge badge-inverse votingCount">
          <div>{{ count }}</div>
        </div>
      </div>
    </div>
  `,
})
export class UpvoteComponent {
  constructor(public auth: AuthService) { }

  @Input() count: number;
  heartColor: string;

  @Input() set voted(val) {
    this.heartColor = val ? 'crimson' : 'white';
  }

  @Output() vote = new EventEmitter();

  onClick() {
    this.vote.emit({});
  }
}
