import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { INoteData } from '../../data-access/note.service';

/**
 * Component for display and maintenance of note data
 *
 * @export
 * @class NoteComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent implements OnInit, AfterViewInit {
  @Input() note!: INoteData;
  @Input() label!: string;
  @Output() saveNote: EventEmitter<INoteData> = new EventEmitter();
  @Output() deleteNote: EventEmitter<INoteData> = new EventEmitter();

  editing = false;
  saving = false;

  constructor(
    public sanitizer: DomSanitizer
  ) {
    this.note = {
      data: '',
      dateCreated: new Date(),
      deleted: false
    }
    this.label = '';
    this.editing = false;
    this.saving = false;
   }

  ngOnInit() {

    this.editing = false;
    if (this.note.new) {
      this.editing = true;
      return;
    }
  }
  ngAfterViewInit(): void {

  }

  /**
   * Sanitize  the new note data, and emit a saveNote event
   * @param note new note data
   */
  doSave(note: INoteData): void {
    this.saving = true;
    this.editing = false;
    const sanitizeData = this.sanitizer.sanitize(SecurityContext.HTML,note.data);
    note.data = sanitizeData;
    note.new = false;
    this.saveNote.emit(note);
    this.saving = false;
  }

  /**
   * Emit a deleteNote event
   * @param note note data to be deleted
   */
  doDelete(note: INoteData): void {
    this.deleteNote.emit(note);
  }

  /**
   * Trigger the editing mode for the note
   * @returns void
   */
  clickEdit():void {
    if (this.saving) {
      return;
    }
    if (!this.editing) {}
    this.editing = true;
  }
}
