import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient) { }
  
  getWeatherForCity(lat: number, lon: number,): Observable<any> {
    return this.http.get(`${environment.apiUrl}?lat=${lat}&lon=${lon}&appid=${environment.API_key}`);
  }
}
