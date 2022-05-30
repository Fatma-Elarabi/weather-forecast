import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';
import {CardModule} from 'primeng/card';

const primengUsedModules = [
  DropdownModule,
  CardModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ...primengUsedModules
  ]
})
export class PrimengModule { }
