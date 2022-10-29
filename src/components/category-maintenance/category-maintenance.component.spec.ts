import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CategoryMaintenanceComponent } from './category-maintenance.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryMaintenanceComponent', () => {
  let component: CategoryMaintenanceComponent;
  let fixture: ComponentFixture<CategoryMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      {
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule ],
      providers: [
        { provide: MatDialogRef, useValue: CategoryMaintenanceComponent },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [ CategoryMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CategoryMaintenanceComponent', () => {
    expect(component).toBeTruthy();
  });
});
