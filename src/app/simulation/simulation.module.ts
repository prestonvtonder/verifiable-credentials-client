import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api.interceptor';

const simulationInterceptors: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    simulationInterceptors,
  ]
})
export class SimulationModule { }
