import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvertToImgPipe } from '../../pipes/convert-to-img.pipe';
import { WeatherPipe } from '../../pipes/weather.pipe';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardComponent,
        ConvertToImgPipe,
        WeatherPipe
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
