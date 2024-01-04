import { Component } from '@angular/core';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  num!: number;
  constructor(private demoService: DemoService) { }
  ngOnInit() {
    this.demoService.subject.subscribe(
      data => {
        debugger
        this.num = data
      }
    )
  }
}
