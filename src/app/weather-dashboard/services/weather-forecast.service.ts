import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IForecast } from '../models/weather-forecast';
import { ICities } from '../models/city';
import { ICityForecast, IList } from '../models/city-forecast'

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }

  getWeatherForCity(lat: number, lon: number,): Observable<IForecast> {
    return this.http.get<IForecast>(`${environment.apiUrl}weather?lat=${lat}&lon=${lon}&appid=${environment.API_key}`);
  }

  getCitiesByCountryCode(countryName: { country: string; }): Observable<string[]> {
    return this.http.post<ICities>('https://countriesnow.space/api/v0.1/countries/cities', countryName)
      .pipe(map(cities => {
        return cities.data;
      }));
  }

  getHistoryWeatherByCityName(cityName: string): Observable<IList[]> {
    return this.http.get<ICityForecast>(`${environment.apiUrl}forecast?q=${cityName}&appid=${environment.API_key}`)
      .pipe(map(forecastList => {
        return forecastList.list;
      }))
  }
}
