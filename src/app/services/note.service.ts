import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {v4 as uuidv4} from 'uuid';


export interface INoteData {
  uuid?: string;
  dateCreated: Date;
  lastUpdateDate?: Date;
  data: string;
  deleted: boolean;
  ticked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService{

categoryNoteListName = '_CategoryNoteList';

category: string = '';
categoryNoteList: INoteData[] = [];


constructor() {
 }


load(category: string) {
  this.category = category;
  return new Promise<INoteData[]> ((resolve) => {
    const noteData = localStorage.getItem(category + this.categoryNoteListName);
    if (noteData !== null) {
      this.categoryNoteList = JSON.parse(noteData);
      resolve(this.categoryNoteList);
    } else {
      this.save();
    }
  })
}

save() {
  const noteData = JSON.stringify(this.categoryNoteList);
  localStorage.setItem(this.category + this.categoryNoteListName , noteData);
}

addNote(data: string) {
  const newNote: INoteData = {
    uuid: uuidv4(),
    dateCreated: new Date(),
    data,
    ticked: false,
    deleted: false
  }

  this.categoryNoteList.push(newNote);
  this.save();
}

updateNote(noteUuid: string | undefined, data: string) {
  if (noteUuid === undefined) {
    return;
  }
  this.categoryNoteList.some((note, idx) => {
    if (note.uuid === noteUuid) {
      this.categoryNoteList[idx].data = data;
      this.categoryNoteList[idx].lastUpdateDate = new Date();
      this.save();
      return;
    }
  })
}

removeNote(noteUuid: string | undefined) {
  if (noteUuid === undefined) {
    return;
  }
  const noteIdx = this.categoryNoteList.findIndex((note) => note.uuid === noteUuid);
  if (noteIdx !== -1) {
    this.categoryNoteList.splice(noteIdx, 1);
    this.save();
  }
}

getNoteList() {
  const noteList: INoteData[] = [];
  this.categoryNoteList.map((note) => { if (!note.deleted) { noteList.push(note);} });
  return noteList;

}

deleteNotes() {
  localStorage.removeItem(this.category + this.categoryNoteListName);
}

}
