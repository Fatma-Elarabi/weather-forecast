import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading!: boolean;

  constructor(private sharedService: SharedService) {

    this.sharedService.isLoading.subscribe((isLoad) => {
      this.loading = isLoad;
    });

  }
  ngOnInit() {
  }

}
