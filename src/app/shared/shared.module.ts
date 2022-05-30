import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    DropDownComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    DropDownComponent,
    CardComponent
  ]
})
export class SharedModule { }
