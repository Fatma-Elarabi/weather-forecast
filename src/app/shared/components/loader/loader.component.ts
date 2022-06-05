import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  private _destroyed$ = new Subject<void>();
  loading!: boolean;

  constructor(private sharedService: SharedService) {
    this.sharedService.isLoading.pipe(takeUntil(this._destroyed$)).subscribe((isLoad) => {
      this.loading = isLoad;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
