import { Injectable } from '@angular/core';
import { ISession } from '../shared/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError } from '../shared/index';

@Injectable()
export class VoterService {

    constructor(private http: HttpClient) {
    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url)
            .pipe(catchError(handleError('deleteVoter')))
            .subscribe(() => {
                console.log(voterName + ' downvote session: ' + session.name);
            });
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        this.http.post(url, {}, options)
            .pipe(catchError(handleError('addVoter')))
            .subscribe(() => {
                console.log(voterName + ' upvote session: ' + session.name);
            });
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }
}
