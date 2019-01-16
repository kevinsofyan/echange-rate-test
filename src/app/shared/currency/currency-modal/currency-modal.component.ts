import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { RatesType } from "./rates.type";
import { ICurrency } from "../currency.interface";
import { thisTypeAnnotation } from "babel-types";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-currency-modal",
  templateUrl: "./currency-modal.component.html",
  styleUrls: ["./currency-modal.component.scss"]
})
export class CurrencyModalComponent implements OnInit {
  @Input()
  exchangeRateLists: any;

  modalForm: FormGroup;
  ratesType: Array<ICurrency> = RatesType;
  selectedName: String;

  @Output()
  selectedRate = new EventEmitter<ICurrency>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.modalForm = this.formBuilder.group({
      rateSelect: ["", Validators.required]
    });
  }

  selectRate() {
    if (this.modalForm.value !== "") {
      const selectedIndex = RatesType.find(x => x.symbol == this.modalForm.value.rateSelect);
      this.selectedRate.emit(selectedIndex);
    }
  }

}
