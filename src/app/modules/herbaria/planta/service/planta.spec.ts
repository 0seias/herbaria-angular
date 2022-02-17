import { TestBed } from '@angular/core/testing';

import { PlantaService } from './planta.service';

describe('PlantaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantaService = TestBed.get(PlantaService);
    expect(service).toBeTruthy();
  });
});
