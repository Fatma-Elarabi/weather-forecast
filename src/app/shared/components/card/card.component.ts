import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() temp!: number;
  @Input() windSpeed!: number;
  @Input() humidity!: number;
  @Input() weatherStatus!: string;
  @Input() weatherIcon!: string;
  iconUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.iconUrl = `http://openweathermap.org/img/w/${this.weatherIcon}.png`;
  }
}
