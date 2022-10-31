import { MatListModule } from '@angular/material/list';
import { CategoryMaintenanceModule } from '../components/category-maintenance/category-maintenance.module';
import { NotesDisplayComponent } from './../components/notes-display/notes-display.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { CategoryMaintenanceComponent } from 'src/components/category-maintenance/category-maintenance.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { NotesDisplayModule } from 'src/components/notes-display/notes-display.module';
import { NoteListComponent } from 'src/components/notes-display/ui/note-list/note-list.component';
import { NoteComponent } from 'src/components/notes-display/ui/note/note.component';

@NgModule({
  declarations: [
    CategoryMaintenanceComponent,
    AppComponent,
    NotesDisplayComponent,
    NoteListComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    NotesDisplayModule,
    CategoryMaintenanceModule,
    MatListModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    NotesDisplayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
