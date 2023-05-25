import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThannksPageComponent } from './thannks-page.component';

describe('ThannksPageComponent', () => {
  let component: ThannksPageComponent;
  let fixture: ComponentFixture<ThannksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThannksPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThannksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
