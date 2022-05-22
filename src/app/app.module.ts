import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { BlockUIModule } from 'primeng/blockui'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

import { AppRoutingModule } from './app-routing.module'
import { DohModule } from './doh/doh.module'
import { TravelModule } from './travel/travel.module'

import { AppComponent } from './app.component'

import { environment } from '../environments/environment'
import { SimulationModule } from './simulation/simulation.module'

const { simulation: shouldSimulate } = environment;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BlockUIModule,
    ProgressSpinnerModule,
    AppRoutingModule,
    DohModule,
    TravelModule,
    shouldSimulate ? SimulationModule : [ ],
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
