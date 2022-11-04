import { Component, OnInit } from '@angular/core';
import Pensioner from 'src/app/Entity/Pensioner';
import { PensionerService } from 'src/app/Services/pensioner.service';

@Component({
  selector: 'app-pensioner-home',
  templateUrl: './pensioner-home.component.html',
  styleUrls: ['./pensioner-home.component.css']
})
export class PensionerHomeComponent implements OnInit {

  data:Pensioner = new Pensioner();
  adhaar = ""
  getPensioner() {
    const observables = this.pensionerService.getPensioner(this.adhaar);
    observables.subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(private pensionerService:PensionerService) { }
  ngOnInit(): void {
  }

}
