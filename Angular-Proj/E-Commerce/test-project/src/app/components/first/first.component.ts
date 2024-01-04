import { Component } from '@angular/core';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {

  num: number = 0;
  constructor(private demoService: DemoService) { }
  check(msg: string) {
    this.demoService.sendNumber(msg);
  }

  ngOnInit() {
    this.demoService.subject.subscribe(

      data => {
        debugger
        this.num = data
      }
    )
  }
}
