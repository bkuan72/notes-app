/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppGoogleDriveIfaceComponent } from './app-google-drive-iface.component';

describe('AppGoogleDriveIfaceComponent', () => {
  let component: AppGoogleDriveIfaceComponent;
  let fixture: ComponentFixture<AppGoogleDriveIfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGoogleDriveIfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGoogleDriveIfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
