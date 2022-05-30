import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDashboardRoutingModule } from './weather-forecast-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WeatherDashboardRoutingModule,
    SharedModule
  ]
})
export class WeatherDashboardModule { }
