import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { IList } from '../../models/city-forecast';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import SwiperCore, { Navigation } from "swiper";
import { temperature } from 'src/app/shared/models/chart-data';
import { SharedService } from 'src/app/shared/services/shared.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CityForecastComponent implements OnInit {

  chartOption!: EChartsOption;
  currentCountry!: string;
  cities!: string[];
  selectedCity!: string;
  cityForecast!: IList[];
  currentCityWeather!: IList;
  temp!: number;
  windSpeed!: number;
  humidity!: number;
  weatherStatus!: string;
  weatherIcon!: string;
  countryCode!: string;
  countryName!: string | undefined;
  xAxis: string[] = [];
  yAxis: number[] = [];
  barChartData!: temperature[];
  isLineChart = true;

  constructor(
    private weatherService: WeatherForecastService,
    private sharedService: SharedService,
    private route: ActivatedRoute) {
      this.currentCountry = this.route.snapshot.params['country'];
    }

  ngOnInit(): void {
    // this.getCities();
  }

  getCities(): void {
    const body = {
      country: this.currentCountry
    }
    this.weatherService.getCitiesByCountryCode(body).subscribe({
      next: cities => this.cities = cities,
      error: () => {},
      complete: () => {
        this.selectedCity = this.cities[0];
        this.getHistoricalWeather();
      }
    })
  }

  getHistoricalWeather(): void {
    this.weatherService.getHistoryWeatherByCityName(this.selectedCity).subscribe({
      next: forecast => {
          this.cityForecast = forecast;
          this.dataToSendToCard(this.cityForecast[0]);
      },
      error: () => {},
      complete: () => {
        this.initChart();
        this.dataToSendToBarChart();
      }
    });
  }

  dataToSendToCard(weatherSelectedTime: IList): void {
    this.currentCityWeather = weatherSelectedTime;
    this.temp = this.currentCityWeather.main.temp;
    this.windSpeed = this.currentCityWeather.wind.speed;
    this.humidity = this.currentCityWeather.main.humidity;
    this.weatherStatus = this.currentCityWeather.weather[0].main;
    this.weatherIcon = this.currentCityWeather.weather[0].icon;
  }

  initAxis(): void {
    this.cityForecast.filter( axis => {
      this.xAxis.push(axis.dt_txt);
      this.yAxis.push(axis.main.temp-273.15);
    });
  }

  initChart(): void {
    this.initAxis();
    this.chartOption = {
      tooltip: {
        show: true
      },
      xAxis: {
        type: 'category',
        data: this.xAxis,
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
        },
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          data: this.yAxis,
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
  }

  dataToSendToBarChart(): void {
    this.barChartData = [];
    this.cityForecast.slice(0,8).filter( data => {
      this.barChartData.push(
        {
          date: data.dt_txt,
          temp: Number((data.main.temp-273.15).toFixed())
        }
      )
    })
    this.sharedService.barChartData.next(this.barChartData);
  }

  toggleChart(chart: string): void {
    if(chart === 'line') {
      this.isLineChart = true;
    } else if(chart === 'bar') {
      this.isLineChart = false;
      this.dataToSendToBarChart();
    }
  }
}
