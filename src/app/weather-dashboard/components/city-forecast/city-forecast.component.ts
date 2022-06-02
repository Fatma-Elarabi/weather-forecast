import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { IList } from '../../models/city-forecast';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import SwiperCore, { Navigation } from "swiper";

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

  constructor(
    private weatherService: WeatherForecastService,
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
      complete: () => this.initChart()
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
      this.yAxis.push(axis.main.temp);
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
}
