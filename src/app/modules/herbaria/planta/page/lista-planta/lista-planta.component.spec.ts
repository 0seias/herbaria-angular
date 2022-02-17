import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlantaComponent } from './lista-planta.component';

describe('ListaPlantaComponent', () => {
  let component: ListaPlantaComponent;
  let fixture: ComponentFixture<ListaPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlantaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
