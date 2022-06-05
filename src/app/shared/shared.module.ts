import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './components/card/card.component';
import { ConvertToImgPipe } from './pipes/convert-to-img.pipe';
import { WeatherPipe } from './pipes/weather.pipe';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorInterceptor } from '../core/interceptors/loader-interceptor.interceptor';


@NgModule({
  declarations: [
    CardComponent,
    ConvertToImgPipe,
    WeatherPipe,
    BarChartComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [
    CardComponent,
    BarChartComponent,
    LoaderComponent,
    ConvertToImgPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorInterceptor, multi: true }
  ],
})
export class SharedModule { }
