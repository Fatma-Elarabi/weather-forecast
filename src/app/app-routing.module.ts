import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'weather-forecast', loadChildren: () => import('./weather-dashboard/weather-forecast.module').then(m => m.WeatherDashboardModule) },
  { path: '', redirectTo: 'weather-forecast', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
