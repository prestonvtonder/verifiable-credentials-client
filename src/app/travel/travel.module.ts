import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';

import { TravelComponent } from './travel.component';

@NgModule({
  declarations: [
    TravelComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SkeletonModule,
  ]
})
export class TravelModule { }
