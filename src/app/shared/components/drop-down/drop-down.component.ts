import { Component, OnInit } from '@angular/core';


interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})

export class DropDownComponent implements OnInit {

  cities: City[];

    selectedCity!: City;

    constructor() {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
    }

  ngOnInit(): void {
  }

}
