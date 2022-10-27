import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CategoryMaintenanceComponent } from 'src/components/category-maintenance/category-maintenance.component';
import { INoteData, NoteService } from 'src/app/services/note.service';
import { CategoryService } from 'src/app/services/category.service';

/** @title Responsive sidenav */
@Component({
  selector: 'notes-display-component',
  templateUrl: 'notes-display.component.html',
  styleUrls: ['notes-display.component.css'],
})
export class NotesDisplayComponent implements OnDestroy {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;


  title = 'Notes App';
  categories: string[] = [];
  showFiller = false;
  category: CategoryService;
  noteServices: NoteService[] = [];
  notes: INoteData[] = [];

  selectedCategory: string = "";

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public dialog: MatDialog) {

    this.category = new CategoryService();
    this.category.load().then((categoryList) => {
      this.categories = categoryList;
      if (this.categories.length > 0) {
        this.selectedCategory = this.categories[0];
        const noteService = new NoteService();
        this.noteServices.push(noteService);
        noteService.load(this.selectedCategory ).then((notes) => {
          this.notes = notes;
        })
      }
    })
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
      this.category.save(this.categories);
      this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  findNoteService(category: string): NoteService | undefined {

    const noteIdx = this.noteServices.findIndex((noteS) => noteS.category === category);
    if (noteIdx !== -1) {
      return this.noteServices[noteIdx];
    }
    return undefined;
  }

  select(category: string): void {
    let found = false;
    this.notes = [];
    this.selectedCategory = category;

    const noteService = this.findNoteService(category);
    if (noteService === undefined) {
      const newNoteService = new NoteService();
      newNoteService.load(category).then((notes) => {
        this.notes = notes;
        this.noteServices.push(newNoteService);
      });
      return;
    }
    noteService.load(category).then((notes) => {
      this.notes = notes;
    })
  }

  getNewCategory(): void {
    this.selectedCategory = '';
    const dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
      width: '250px',
      data: {old: '', new: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result && result !== null && result !== "") {
        const idx = this.categories.findIndex((category) => category === result);
        if (idx !== -1) {
          alert("Category Already Exist");
          return;
        }
        this.categories.push(result);
        this.category.save(this.categories);
        this.notes = [];
      }
    });
  }

  removeCategory(rmCategory: string) {
    const categoryIdx = this.categories.findIndex((category) => category === rmCategory);
    if (categoryIdx !== -1) {
      const noteService = this.findNoteService(rmCategory);
      if (noteService) {
        noteService.deleteNotes();
      }
      this.categories.splice(categoryIdx, 1);
      this.category.save(this.categories);
    }
  }

  addNewNote() {
      if (this.selectedCategory) {
        const categoryIdx = this.categories.findIndex((category) => category === this.selectedCategory);
        if (categoryIdx !== -1) {
          let noteService = this.findNoteService(this.selectedCategory);
          if (noteService === undefined) {
            noteService = new NoteService();
            this.noteServices.push(noteService);
            noteService.load(this.selectedCategory).then(() => {
              if (noteService) {
                noteService.addNote('');
                this.notes = noteService.getNoteList();
              }
            });
          } else {
            noteService.addNote('');
            this.notes = noteService.getNoteList();
          }

      }
    }
  }

  doSaveNote(note: INoteData) {
    const noteService = this.findNoteService(this.selectedCategory);
    if (noteService) {
      noteService.updateNote(note.uuid, note.data);
    }
  }

  doDeleteNote(note: INoteData) {
    const noteService = this.findNoteService(this.selectedCategory);
    if (noteService) {
      noteService.removeNote(note.uuid);
      this.notes = noteService.getNoteList();
    }
  }

}
