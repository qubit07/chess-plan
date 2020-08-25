import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundGamesComponent } from './round-games.component';

describe('RoundGamesComponent', () => {
  let component: RoundGamesComponent;
  let fixture: ComponentFixture<RoundGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
