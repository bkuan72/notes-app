import { MatIconModule } from '@angular/material/icon';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { NotesDisplayComponent } from './notes-display.component';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      declarations: [ NotesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
