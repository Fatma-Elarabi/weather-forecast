import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/dropdown';

const primengUsedModules = [
  DropdownModule,
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
