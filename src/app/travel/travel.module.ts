import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

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
    SkeletonModule,
    TableModule,
  ]
})
export class TravelModule { }
