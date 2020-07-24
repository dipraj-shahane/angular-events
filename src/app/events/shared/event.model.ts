import { ILocation } from './location.model';
import { ISession } from './session.model';

export interface IEvent {
    id: number;
    name: string;
    date: Date;
    time: string;
    price: number;
    imageUrl: string;
    onlineUrl?: string;
    location?: ILocation;
    sessions: ISession[];
}

