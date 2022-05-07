import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { DohModule } from './doh/doh.module';
import { TravelModule } from './travel/travel.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DohModule,
    TravelModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
