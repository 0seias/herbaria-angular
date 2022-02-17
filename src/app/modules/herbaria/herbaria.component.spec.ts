import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerbariaComponent } from './herbaria.component';

describe('HerbariaComponent', () => {
  let component: HerbariaComponent;
  let fixture: ComponentFixture<HerbariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerbariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerbariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
