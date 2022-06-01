import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { WeatherForecastService } from '../../services/weather-forecast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todayDate = new Date();
  coor!: GeolocationPosition;
  lat!: number;
  lon!: number;
  count!: number;
  country: any;
  state: any;
  city: any;

  constructor(private http: HttpClient,
    private weatherService: WeatherForecastService) { }

  ngOnInit(): void {
    // this.getLocation()
    this.getLatLon();
  }

  getLatLon(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position['coords']['latitude'];
      this.lon = position['coords']['longitude'];
      console.log(this.lat, this.lon);

      // this.getWeather()
      // this.displayLocation(this.lat, this.long)
      // console.log(this.getCurrentLocation(this.lat, this.long));
    });
  }

  getWeather() {
    this.weatherService.getWeatherForCity(this.lat, this.lon).subscribe({
      next: weather => console.log(weather),
      error: () => {},
      complete: () => {}
    })
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

}
