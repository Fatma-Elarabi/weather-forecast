import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToImg'
})
export class ConvertToImgPipe implements PipeTransform {

  transform(value: string): string {
    return `http://openweathermap.org/img/w/${value}.png`;
  }

}
