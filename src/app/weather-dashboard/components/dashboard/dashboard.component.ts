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
    // this.getLocation()
    this.getLatLon();
  }

  getLatLon(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position['coords']['latitude'];
      this.lon = position['coords']['longitude'];
      console.log(this.lat, this.lon);

      // this.getWeather();
      // this.displayLocation(this.lat, this.long)
      // console.log(this.getCurrentLocation(this.lat, this.long));
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
        console.log(this.temp);
        
      },
      error: () => {},
      complete: () => this.getCountryName()
    })
  }

  getCountryName() {
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    this.countryName = regionNames.of(this.countryCode);
  }
//   getLocation(){
//     if (navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(this.showPosition,this.showError);
//     }
//     else{
//         console.log('Geolocation is not supported by this browser');
//     }
// }

// showPosition(position: GeolocationPosition ){
//   console.log(position);
  
//     let lat=position['coords']['latitude'];
//     console.log(lat);
    
//     let lon=position['coords']['longitude'];
//     this.displayLocation(lat,lon);
// }

// showError(error: any){
//     switch(error.code){
//         case error.PERMISSION_DENIED:
//             console.log('User denied the request for Geolocation');
//         break;
//         case error.POSITION_UNAVAILABLE:
//            console.log('Location information is unavailable');
//         break;
//         case error.TIMEOUT:
//             console.log('The request to get user location timed out');
            
//         break;
//         case error.UNKNOWN_ERROR:
//             console.log('An unknown error occurred');
//         break;
//     }
// }

// displayLocation(latitude: number,longitude: number){
  
//     var geocoder;
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(latitude, longitude);

//     geocoder.geocode(
//         {'location': latlng}, 
//         (results, status) => {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 if (results[0]) {
//                     var add= results[0].formatted_address ;
//                     var  value=add.split(",");

//                     this.count=value.length;
//                     this.country=value[this.count-1];
//                     this.state=value[this.count-2];
//                     this.city=value[this.count-3];
//                     // x.innerHTML = "city name is: " + city;
//                     console.log(this.city);
                    
//                 }
//                 else  {
//                     console.log('address not found');
                    
//                 }
//             }
//             else {
//                 console.log(status);
                
//             }
//         }
//     );
// }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
