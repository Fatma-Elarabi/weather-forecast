import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../../services/weather-forecast.service';
import { Subject, takeUntil } from 'rxjs';
import { IForecast } from '../../models/weather-forecast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _destroyed$ = new Subject<void>();

  todayDate = new Date();
  lat!: number;
  lon!: number;
  weatherDetails!: IForecast;
  temp!: number;
  windSpeed!: number;
  humidity!: number;
  weatherStatus!: string;
  weatherIcon!: string;
  countryCode!: string;
  countryName!: string | undefined;

  constructor(private weatherService: WeatherForecastService) { }

  ngOnInit(): void {
    this.getLatLon();
  }

  getLatLon(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position['coords']['latitude'];
      this.lon = position['coords']['longitude'];
      this.getWeather();
    });
  }

  getWeather() {
    this.weatherService.getWeatherForCity(this.lat, this.lon).pipe(takeUntil(this._destroyed$)).subscribe({
      next: weather => {
        this.weatherDetails = weather;
        this.temp = this.weatherDetails.main.temp;
        this.windSpeed = this.weatherDetails.wind.speed;
        this.humidity = this.weatherDetails.main.humidity;
        this.weatherStatus = this.weatherDetails.weather[0].main;
        this.weatherIcon = this.weatherDetails.weather[0].icon;
        this.countryCode = this.weatherDetails.sys.country;
      },
      error: () => { },
      complete: () => this.getCountryName()
    })
  }

  getCountryName() {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    this.countryName = regionNames.of(this.countryCode);
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
