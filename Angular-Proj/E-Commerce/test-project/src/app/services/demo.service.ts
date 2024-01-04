import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DemoCls } from '../common/demo-cls';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  demoCls!: DemoCls;
  subject: Subject<any> = new Subject<any>();
  constructor() { }
  sendNumber(data: string) {
    this.computeTotals(data);
    // this.subject.next(data);
  }
  computeTotals(data1: string) {
    let totalPrice: number = this.demoCls.price;
    this.subject.next(data1);
  }
}
