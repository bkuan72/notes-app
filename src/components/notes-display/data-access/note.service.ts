import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid';

/**
 * Note Data Interface
 */
export interface INoteData {
  new?: boolean,
  uuid?: string;
  dateCreated: Date;
  lastUpdateDate?: Date | null;
  data: string | null;
  deleted: boolean;
  ticked?: boolean;
}
/**
 *This service manage the load/save/add/update/delete of category notes
 *
 * @export
 * @class NoteService
 */
@Injectable({
  providedIn: 'root'
})
export class NoteService{

categoryNoteListName = '_CategoryNoteList';

category: string = '';
categoryNoteList: INoteData[] = [];


constructor() {
 }

/**
 * Load or create category note list
 * @param category category
 * @returns category note list
 */
load(category: string) {
  this.category = category;
  return new Promise<INoteData[]> ((resolve) => {
    const noteData = localStorage.getItem(category + this.categoryNoteListName);
    if (noteData !== null) {
      this.categoryNoteList = JSON.parse(noteData);
      resolve(this.categoryNoteList);
    } else {
      this.categoryNoteList = [];
      this.save();
      resolve([]);
    }
  })
}

/**
 * Save the category note list
 * @returns true saved
 */
save(): boolean {
  const noteData = JSON.stringify(this.categoryNoteList);
  localStorage.setItem(this.category + this.categoryNoteListName , noteData);
  return true;
}

/**
 * Add and initialize new note data
 * @param data note data
 * @returns new note data created
 */
addNote(data: string): INoteData {
  const newNote: INoteData = {
    uuid: uuidv4(),
    new: true,
    dateCreated: new Date(),
    data,
    ticked: false,
    deleted: false
  }

  this.categoryNoteList.push(newNote);
  this.save();
  return (newNote);
}

/**
 * Update the note data
 * @param noteUuid note unique identifier
 * @param data note data buffer
 * @returns index of note updated
 */
updateNote(noteUuid: string | undefined, data: string | null): number {
  if (noteUuid === undefined) {
    return -1;
  }
  let updIdx = -1;
  this.categoryNoteList.some((note, idx): any | undefined => {
    if (note.uuid === noteUuid) {
      updIdx = idx;
      this.categoryNoteList[idx].new = false;
      this.categoryNoteList[idx].data = data;
      this.categoryNoteList[idx].lastUpdateDate = new Date();
      this.save();
      return;
    }
  })
  return updIdx;
}


/**
 * Delete the note from the category note list
 * @param noteUuid - note unique identifier
 * @returns index number of note deleted
 */
removeNote(noteUuid: string | undefined): number {
  if (noteUuid === undefined) {
    return -1;
  }
  const noteIdx = this.categoryNoteList.findIndex((note) => note.uuid === noteUuid);
  if (noteIdx !== -1) {
    this.categoryNoteList.splice(noteIdx, 1);
    this.save();
  }
  return noteIdx;
}

/**
 * Retrieve the category notes
 * @returns list of category notes
 */
getNoteList(): INoteData[]   {
  const noteList: INoteData[] = [];
  this.categoryNoteList.map((note) => { if (!note.deleted) { noteList.push(note);} });
  return noteList;

}

/**
 * Delete all notes for the Category
 * @returns void
 */
deleteNotes(): boolean {
  localStorage.removeItem(this.category + this.categoryNoteListName);
  return true;
}

}
