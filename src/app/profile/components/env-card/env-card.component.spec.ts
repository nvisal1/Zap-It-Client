import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvCardComponent } from './env-card.component';

describe('EnvCardComponent', () => {
  let component: EnvCardComponent;
  let fixture: ComponentFixture<EnvCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
