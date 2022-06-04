import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { SharedRoutingModule } from './shared-routing.module';
import { CardComponent } from './components/card/card.component';
import { ConvertToImgPipe } from './pipes/convert-to-img.pipe';
import { WeatherPipe } from './pipes/weather.pipe';


@NgModule({
  declarations: [
    CardComponent,
    ConvertToImgPipe,
    WeatherPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [
    CardComponent,
    ConvertToImgPipe
  ]
})
export class SharedModule { }
