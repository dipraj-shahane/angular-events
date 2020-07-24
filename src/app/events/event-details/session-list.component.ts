import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from '../../user/index';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styles: [],
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterByProp: string;
  @Input() sortByProp: string;
  @Input() eventId: number;

  visibleSessions: ISession[] = [];

  constructor(public auth: AuthService, private voterService: VoterService) {}

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterByProp);
      this.sortByProp === 'name'
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession) {
    const currentUser = this.auth.currentUser;
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        currentUser.userName
      );
    } else {
      this.voterService.addVoter(this.eventId, session, currentUser.userName);
    }
    if (this.sortByProp === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession): boolean {
    const currentUser = this.auth.currentUser;
    return this.voterService.userHasVoted(session, currentUser?.userName);
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(
        (session) => session.level.toLocaleLowerCase() === filter
      );
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
