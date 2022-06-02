import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() temp!: number;
  @Input() windSpeed!: number;
  @Input() humidity!: number;
  @Input() weatherStatus!: string;
  @Input() weatherIcon!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
