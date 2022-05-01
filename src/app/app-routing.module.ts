import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DohComponent } from './doh/doh.component';
import { TravelComponent } from './travel/travel.component';

const routes: Routes = [{
  path: 'doh',
  component: DohComponent,
}, {
  path: 'travel',
  component: TravelComponent,
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
