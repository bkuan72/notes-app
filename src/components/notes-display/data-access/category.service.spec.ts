/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryService } from './category.service';

describe('Service: Category', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryService]
    });
  });

  it('should inject CategoryService...', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
  it('categoryListName should exist...', inject([CategoryService], (service: CategoryService) => {
    expect(service.categoryListName).toBeDefined();
  }));
  it('categoriesList should exist...', inject([CategoryService], (service: CategoryService) => {
    expect(service.categoriesList).toBeDefined();
  }));

  it('CategoryService should load...', inject([CategoryService], (service: CategoryService) => {
    expect(service.load()).toBeTruthy();
  }));
  it('CategoryService should save...', inject([CategoryService], (service: CategoryService) => {
    expect(service.save([])).toBeTruthy();
  }));
});
