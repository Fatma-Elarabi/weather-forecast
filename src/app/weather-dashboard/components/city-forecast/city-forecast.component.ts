import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss']
})
export class CityForecastComponent implements OnInit {

  selectedCar!: number;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    chartOption: EChartsOption = {
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: "#ffff11"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          fontWeight: "bolder"
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: "#ffff11"
          }
        },
        axisTick: {
          show: false,
        }
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          itemStyle: {
            color: "#fff"
          },
          areaStyle: {
            color: "#fff",
            opacity: 0.5
          }
        },
      ],
    };

  constructor() { }

  ngOnInit(): void {
    this.selectedCar = this.cars[0].id;
  }

}
