import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WeatherForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
