import { VoterService } from './voter.service';
import { ISession } from '../shared/index';
import { of } from 'rxjs';

describe('VoterService', () => {

    let voterService: VoterService;
    let mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        let session;
        beforeEach(() => {
            // session = { id: 6, name: 'test delete voter', voters: ['joe', 'john'] };
            // mockHttp.delete.and.returnValue(of(false));
        });

        it('should remove the voter from the list of voters', () => {
            session = { id: 6, name: 'test delete voter', voters: ['joe', 'john'] };
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with the right URL', () => {
            session = { id: 6, name: 'test delete voter', voters: ['joe', 'john'] };
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
        });
    });

    describe('addVoter', () => {
        let session;
        it('should call http.post with the right URL', () => {
            session = { id: 6, name: 'test add voter', voters: ['john'] };
            mockHttp.post.and.returnValue(of(false));

            voterService.addVoter(3, session as ISession, 'joe');

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {},
                jasmine.any(Object));

        });
    });

});
