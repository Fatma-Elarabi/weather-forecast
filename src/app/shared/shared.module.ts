import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { SharedRoutingModule } from './shared-routing.module';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { CardComponent } from './components/card/card.component';
import { PrimengModule } from './primeng/primeng.module';


@NgModule({
  declarations: [
    DropDownComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    PrimengModule
  ],
  exports: [
    DropDownComponent,
    CardComponent
  ]
})
export class SharedModule { }
