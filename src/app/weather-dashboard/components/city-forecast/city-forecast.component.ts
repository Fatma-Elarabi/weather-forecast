import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import { IList } from '../../models/city-forecast';
import { WeatherForecastService } from '../../services/weather-forecast.service';

@Component({
  selector: 'app-city-forecast',
  templateUrl: './city-forecast.component.html',
  styleUrls: ['./city-forecast.component.scss']
})
export class CityForecastComponent implements OnInit {

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
  currentCountry!: string;
  cities!: string[];
  selectedCity!: string;
  currentCityWeather!: IList;
  temp!: number;
  windSpeed!: number;
  humidity!: number;
  weatherStatus!: string;
  weatherIcon!: string;
  countryCode!: string;
  countryName!: string | undefined;

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
    this.weatherService.getHistoryWeatherByCityName(this.selectedCity).subscribe( forecast => {
      this.currentCityWeather = forecast[0];
      this.temp = this.currentCityWeather.main.temp;
      this.windSpeed = this.currentCityWeather.wind.speed;
      this.humidity = this.currentCityWeather.main.humidity;
      this.weatherStatus = this.currentCityWeather.weather[0].main;
      this.weatherIcon = this.currentCityWeather.weather[0].icon;
    });
  }
}
