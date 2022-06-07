import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityForecastComponent } from './city-forecast.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CityForecastComponent', () => {
  let component: CityForecastComponent;
  let fixture: ComponentFixture<CityForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityForecastComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
