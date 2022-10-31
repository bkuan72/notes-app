/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('note should be provided', () => {
    expect(component.note).toBeDefined();
  });
  it('label should be provided', () => {
    expect(component.label).toBeDefined();
  });
  it('editing should be provided', () => {
    expect(component.editing).toBeDefined();
  });
  it('saving should be provided', () => {
    expect(component.editing).toBeDefined();
  });
});
