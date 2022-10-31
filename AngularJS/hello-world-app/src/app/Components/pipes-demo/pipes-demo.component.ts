import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipes-demo',
  templateUrl: './pipes-demo.component.html',
  styleUrls: ['./pipes-demo.component.css']
})
export class PipesDemoComponent implements OnInit {
  batsman="Dhoni"
  age=40
  salary=1000000
  height=" 5\'11\" "
  description="Less than thirty years before that enchanting Saturday night when Ravi Shastri’s voice rang through television sets all over India, when even the spunky and exuberant Indian youth showed more interest in an old-school CRT television at a local chai ki dukaan than the dance-floor at a pub, a pump-operator in Ranchi awaited the birth of his third child."
  dateInfo=Date.now()
  mod=22/100
  constructor() { }

  ngOnInit(): void {
  }

}
