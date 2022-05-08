import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DohComponent } from './doh/doh.component';
import { PortalComponent as DohPortalComponent } from './doh/portal.component';

import { TravelComponent } from './travel/travel.component';
import { PortalComponent as TravelPortalComponent } from './travel/portal.component';

const routes: Routes = [
  { path: 'doh',            component: DohComponent },
  { path: 'doh/portal',     component: DohPortalComponent },
  { path: 'travel',         component: TravelComponent },
  { path: 'travel/portal',  component: TravelPortalComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
