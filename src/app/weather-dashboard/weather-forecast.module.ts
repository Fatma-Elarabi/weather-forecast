import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDashboardRoutingModule } from './weather-forecast-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CityForecastComponent
  ],
  imports: [
    CommonModule,
    WeatherDashboardRoutingModule,
    SharedModule
  ]
})
export class WeatherDashboardModule { }
