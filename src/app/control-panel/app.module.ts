import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [AppComponent],
  bootstrap : [ 
    AppComponent
  ]
})
export class ControlPanelModule { }
