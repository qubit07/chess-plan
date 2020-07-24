import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPlayerListComponent } from './tournament-player-list.component';

describe('TournamentPlayerListComponent', () => {
  let component: TournamentPlayerListComponent;
  let fixture: ComponentFixture<TournamentPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPlayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
