import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';

import { DohComponent } from './doh.component';

@NgModule({
  declarations: [
    DohComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    SkeletonModule,
  ],
  exports: [
    DohComponent,
  ]
})
export class DohModule { }
