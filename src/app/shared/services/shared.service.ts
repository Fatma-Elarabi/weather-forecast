import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { temperature } from '../models/chart-data';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  barChartData = new BehaviorSubject<temperature[]>([]);

  constructor() { }
}
