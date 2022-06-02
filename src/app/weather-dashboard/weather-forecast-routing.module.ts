import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityForecastComponent } from './components/city-forecast/city-forecast.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ':country',
    component: CityForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherDashboardRoutingModule { }
