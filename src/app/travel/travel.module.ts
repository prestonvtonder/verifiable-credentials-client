import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DialogModule } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { MessageModule } from 'primeng/message'
import { SkeletonModule } from 'primeng/skeleton'
import { SpeedDialModule } from 'primeng/speeddial'
import { StepsModule } from 'primeng/steps'
import { TimelineModule } from 'primeng/timeline'

import { TravelComponent } from './travel.component'
import { PortalComponent } from './portal.component'

@NgModule({
  declarations: [
    TravelComponent,
    PortalComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DividerModule,
    MessageModule,
    SkeletonModule,
    SpeedDialModule,
    StepsModule,
    TimelineModule,
  ]
})
export class TravelModule { }
