import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

import { DohComponent } from './doh.component';
import { PortalComponent } from './portal.component';

@NgModule({
  declarations: [
    DohComponent,
    PortalComponent,
  ],
  imports: [
    CommonModule,
    AccordionModule,
    ButtonModule,
    CardModule,
    ChipModule,
    DialogModule,
    SkeletonModule,
    TagModule,
    TimelineModule,
  ]
})
export class DohModule { }
