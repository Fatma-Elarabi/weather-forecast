import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDashboardRoutingModule } from './weather-forecast-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    WeatherDashboardRoutingModule
  ]
})
export class WeatherDashboardModule { }
