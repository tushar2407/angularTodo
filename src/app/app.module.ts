import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {baseUrl} from './shared/baseUrl';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DragdropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'BaseURL', useValue:baseUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
