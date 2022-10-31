import { INoteData } from './note.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteService } from './note.service';

describe('Service: Note', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteService]
    });
  });

  it('should inject NoteService...', inject([NoteService], (service: NoteService) => {
    expect(service).toBeTruthy();
  }));
  it('categoryListName should exist...', inject([NoteService], (service: NoteService) => {
    expect(service.categoryNoteListName).toBeDefined();
  }));
  it('category should exist...', inject([NoteService], (service: NoteService) => {
    expect(service.category).toBeDefined();
  }));
  it('categoryNoteList should exist...', inject([NoteService], (service: NoteService) => {
    expect(service.categoryNoteList).toBeDefined();
  }));
  it('NoteService should load...', inject([NoteService], (service: NoteService) => {
    expect(service.load('')).toBeTruthy();
  }));
  it('NoteService should save..', inject([NoteService], (service: NoteService) => {
    expect(service.save()).toBeTruthy();
  }));
  it('NoteService should getNoteList..', inject([NoteService], (service: NoteService) => {
    expect(service.getNoteList()).toEqual([]);
  }));
  it('NoteService should addNote..', inject([NoteService], (service: NoteService) => {
    const val = service.addNote('test');
    expect(val.data).toEqual('test');
  }));
  it('NoteService should updateNote..', inject([NoteService], (service: NoteService) => {
    const val = service.updateNote('', 'crap');
    expect(val).toEqual(-1);
  }));
  it('NoteService should removeNoe..', inject([NoteService], (service: NoteService) => {
    expect(service.removeNote('')).toBeTruthy();
  }));
});
