import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private sharedService: SharedService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.sharedService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requests.push(request);

    console.log("No of requests--->" + this.requests.length);

    this.sharedService.isLoading.next(true);
    return Observable.create((observer: { next: (arg0: HttpEvent<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          err => {
            alert('error' + err);
            this.removeRequest(request);
            observer.error(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          });
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
  }
}
