import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPlantaComponent } from './cadastro-planta.component';

describe('CadastroPlantaComponent', () => {
  let component: CadastroPlantaComponent;
  let fixture: ComponentFixture<CadastroPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPlantaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
