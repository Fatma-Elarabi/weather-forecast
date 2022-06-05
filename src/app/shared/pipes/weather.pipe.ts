import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weather'
})
export class WeatherPipe implements PipeTransform {

  transform(value: number): unknown {
    return (value - 273.15).toFixed();
  }

}
