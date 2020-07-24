import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  const mockAuthService: AuthService = null;
  const mockVoterService: VoterService = null;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = [
        { name: 'Session 1', level: 'intermediate' },
        { name: 'Session 2', level: 'intermediate' },
        { name: 'Session 3', level: 'beginner' },
      ] as ISession[];
      component.filterByProp = 'intermediate';
      component.sortByProp = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it('should sort the sessions correctly', () => {
      component.sessions = [
        { name: 'Session 1', level: 'intermediate' },
        { name: 'Session 3', level: 'intermediate' },
        { name: 'Session 2', level: 'beginner' },
      ] as ISession[];
      component.filterByProp = 'all';
      component.sortByProp = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('Session 3');
    });
  });
});
