import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CategoryMaintenanceComponent } from 'src/components/category-maintenance/category-maintenance.component';
import { INoteData, NoteService } from 'src/components/notes-display/data-access/note.service';
import { CategoryService } from 'src/components/notes-display/data-access/category.service';
import { INoteListElement } from './ui/note-list/note-list.component';


@Component({
  selector: 'notes-display-component',
  templateUrl: 'notes-display.component.html',
  styleUrls: ['notes-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDisplayComponent implements OnDestroy {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;


  title = 'Notes App';
  categories: string[] = [];
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
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
  }

  ngOnDestroy(): void {
      this.category.save(this.categories);
      this.mobileQuery.removeEventListener("change", this._mobileQueryListener);
  }
/**
 * Find note service associated with category
 * @param category category name
 * @returns
 */
  findNoteService(category: string): NoteService | undefined {

    const noteIdx = this.noteServices.findIndex((noteS) => noteS.category === category);
    if (noteIdx !== -1) {
      return this.noteServices[noteIdx];
    }
    return undefined;
  }
/**
 * Select category, find/create note service for category and load category note list
 * @param category category name
 * @returns
 */
  select(category: string): Promise<INoteData[]> {
    this.notes = [];
    this.selectedCategory = category;
    return new Promise ((resolve) => {
      const noteService = this.findNoteService(category);
      if (noteService === undefined) {
        const newNoteService = new NoteService();
        newNoteService.load(category).then((notes) => {
          this.notes = notes;
          this.noteServices.push(newNoteService);
        });
        resolve (this.notes);
        return;
      }
      noteService.load(category).then((notes) => {
        this.notes = notes;
        resolve(this.notes);
      });
    })


  }
/**
 * Prompt User for new category name
 */
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
/**
 * Remove category from category list and delete notes associated with the category
 * @param rmCategory category name to be remove
 * @returns
 */
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
    return categoryIdx;
  }
/**
 * Add a new note for the currently selected Category
 * @returns category note list
 */
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
    return this.notes;
  }
/**
 * Save the updated selectedCategory note list
 * @param noteListData note list
 * @returns
 */
  doSaveNote(noteListData: INoteListElement) {
    const noteService = this.findNoteService(this.selectedCategory);
    if (noteService) {
      noteService.updateNote(noteListData.note.uuid, noteListData.note.data);
      return true;
    }
    return false;
  }
/**
 * Delete the selected note from the currently selected Category note list
 * @param noteListData
 */
  doDeleteNote(noteListData: INoteListElement) {
    const noteService = this.findNoteService(this.selectedCategory);
    if (noteService) {
      noteService.removeNote(noteListData.note.uuid);
      this.notes = noteService.getNoteList();
    }
  }

}
