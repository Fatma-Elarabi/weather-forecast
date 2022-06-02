import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICities, IForecast } from '../models/weather-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }
  
  getWeatherForCity(lat: number, lon: number,): Observable<IForecast> {
    return this.http.get<IForecast>(`${environment.apiUrl}?lat=${lat}&lon=${lon}&appid=${environment.API_key}`);
  }

  getCitiesByCountryCode(countryName: { country: string; }): Observable<string[]> {
    return this.http.post<ICities>('https://countriesnow.space/api/v0.1/countries/cities', countryName)
    .pipe(map( cities => {
      return cities.data;
    }));
  }
}
