import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IEvent, ISession } from './index';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }

    getEvents(): Observable<IEvent[]> {
        return this.http.get<IEvent[]>('/api/events/')
            .pipe(catchError(handleError<IEvent[]>('getEvents', [])));
    }

    getEvent(id: number): Observable<IEvent> {
        return this.http.get<IEvent>('/api/events/' + id)
            .pipe(catchError(handleError<IEvent>('getEvent')));
    }

    saveEvent(event: IEvent) {
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post<IEvent>('/api/events', event, options)
            .pipe(catchError(handleError<IEvent>('saveEvent')));
    }

    editEvent(event: IEvent) {
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post<IEvent>(`/api/events` + event.id, event, options)
            .pipe(catchError(handleError<IEvent>('saveEvent')));
    }

    searchSessions(searchTerm: string): Observable<ISession[]> {
        return this.http.get<ISession[]>('/api/sessions/search?search=' + searchTerm)
            .pipe(catchError(handleError<ISession[]>('searchSessions', [])));
    }
}

export function handleError<T>(opertation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(error);
        return of(result as T);
    };
}
