import { AppComponent } from './app.component';
import { CategoryMaintenanceComponent } from 'src/components/category-maintenance/category-maintenance.component';
import { NotesDisplayComponent } from './../components/notes-display/notes-display.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    NotesDisplayComponent,
    CategoryMaintenanceComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
