import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitalComponent } from './inital.component';

describe('InitalComponent', () => {
  let component: InitalComponent;
  let fixture: ComponentFixture<InitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
