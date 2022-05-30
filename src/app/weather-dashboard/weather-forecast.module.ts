import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDashboardRoutingModule } from './weather-forecast-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DashboardComponent,
    CityForecastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WeatherDashboardRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class WeatherDashboardModule { }
