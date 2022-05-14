import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { SpeedDialModule } from 'primeng/speeddial';
import { TimelineModule } from 'primeng/timeline';

import { TravelComponent } from './travel.component';
import { PortalComponent } from './portal.component';

@NgModule({
  declarations: [
    TravelComponent,
    PortalComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    DialogModule,
    DividerModule,
    SkeletonModule,
    SpeedDialModule,
    TimelineModule,
  ]
})
export class TravelModule { }
