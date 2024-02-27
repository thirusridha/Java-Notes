// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  finalData: Subject<any> = new BehaviorSubject<any>(0);
  // data$ = this.dataSubject.asObservable();

  submitToPwd(data: any) {
    debugger
    console.log(data);
    this.finalData.next(data);
  }
}