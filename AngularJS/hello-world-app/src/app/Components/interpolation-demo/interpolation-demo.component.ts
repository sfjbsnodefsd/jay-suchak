import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolation-demo',
  templateUrl: './interpolation-demo.component.html',
  styleUrls: ['./interpolation-demo.component.css']
})
export class InterpolationDemoComponent implements OnInit {

  name:String = "Jay"
  lang:String = "Javascript"
  printAddress() {
    return "Address"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
