import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INoteData } from '../../data-access/note.service';

export interface INoteListElement {
  note: INoteData,
  idx: number
}

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteListComponent implements OnInit {
  @Input() notes!: INoteData[];
  @Input() noteLabel!: string;
  @Output() saveNotes: EventEmitter<INoteListElement> = new EventEmitter();
  @Output() deleteNotes: EventEmitter<INoteListElement> = new EventEmitter();

  constructor() {
    this.notes = [];
    this.noteLabel = '';
   }

  ngOnInit() {
  }
/**
 * returns the note unique identifier for note list serialization
 * @param index index of the  note
 * @param tagData note data
 * @returns note unique identifier
 */
  trackById(index: number, tagData: INoteData) {
    return tagData.uuid;
  }
/**
 * Emit the saveNotes event
 * @param note note data
 * @param idx  index of note in the list
 */
  doSaveNote(note: INoteData, idx: number) {
    const noteElem: INoteListElement = {
      note, idx
    }
    this.saveNotes.emit(noteElem);
  }
  /**
   * Emit the deleteNotes event
   * @param note note data
   * @param idx index of note in the list
   */
  doDeleteNote(note: INoteData, idx: number) {
    const noteElem: INoteListElement = {
      note, idx
    }
    this.deleteNotes.emit(noteElem);
 }
}
