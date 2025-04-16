import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * You can use standalone components in an Angular application which already uses NgModule.
 * 
 * To do so, your component will use standalone:true and have its own dependencies managed within it as usual. 
 * 
 * Here in app.module.ts, regular components are registered in the delcarations arrray, standalone components go in the imports array.
 * So if PhotoComponent was a standalone, the NgModule decorator would look like this:
 * 
 * @NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.
    PhotoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
 *   
 */