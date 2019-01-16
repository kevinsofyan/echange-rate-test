import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef
} from "@angular/core";
import { CurrencyService } from "./currency.service";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ICurrencyList } from "./currency-list.interface";
import { RatesType } from "./currency-modal/rates.type";
import { ICurrency } from "./currency.interface";

@Component({
  selector: "app-currency",
  templateUrl: "./currency.component.html",
  styleUrls: ["./currency.component.scss"]
})
export class CurrencyComponent implements OnInit, AfterViewInit {
  @ViewChild("inputNumber") inputNumber: ElementRef;

  modalRef: NgbModalRef;
  currentValue: number;
  exchangeRateLists: Array<ICurrencyList> = [
    {
      name: "Indonesian Rupiah",
      symbol: "IDR",
      rate: 14124.0021008403,
      total: 0
    }
  ];

  constructor(
    private service: CurrencyService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.inputNumber.nativeElement, "keyup")
      .pipe(
        map((evt: any) => evt.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: any) => {
        this.currentValue = text;
        this.doConvertExchangeRates();
      });
  }

  doConvertExchangeRates() {
    this.exchangeRateLists.forEach(element => {
      this.service.getExhangesRate(element.symbol).subscribe((res: any) => {
        element.rate = res.rates[element.symbol];
        element.total = this.currentValue * element.rate;
      });
    });
  }

  doAddToExchangeRateLists(event: ICurrency) {
    const symbol = event.symbol;
    this.modalRef.close();
    this.service.getExhangesRate(symbol)
    .subscribe((res: any) => {
      this.exchangeRateLists.push({
        name: event.name,
        symbol: symbol,
        rate: res.rates[symbol],
        total: this.currentValue * res.rates[symbol]
      });
    });
  }

  doDeleteExchangeRate(index: number) {
    this.exchangeRateLists.splice(index, 1);
  }

  openCurrencySelectModal(content: TemplateRef<any>) {
   this.modalRef = this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" });
  }
}
