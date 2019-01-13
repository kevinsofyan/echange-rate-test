import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  constructor(
    private service: CurrencyService
  ) { }

  ngOnInit() {
    this.service.getExhangesRate().subscribe( (res: any) => {
      console.log(res);
    })
  }

}
